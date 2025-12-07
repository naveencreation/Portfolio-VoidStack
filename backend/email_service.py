"""
Email Service for Portfolio Contact Form
=========================================
Sends email notifications when someone submits the contact form.
"""

import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
import logging

# Load environment variables from .env file
from pathlib import Path

try:
    from dotenv import load_dotenv
    # Get the directory where this file is located
    env_path = Path(__file__).parent / ".env"
    load_dotenv(env_path)
    print(f"Loaded .env from: {env_path}")
except ImportError:
    print("python-dotenv not installed, using system environment variables")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class EmailService:
    """Simple email service for contact form notifications"""
    
    def __init__(self):
        self.smtp_server = os.getenv("MAIL_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("MAIL_PORT", "587"))
        self.username = os.getenv("MAIL_USERNAME")
        self.password = os.getenv("MAIL_PASSWORD")
        self.from_email = os.getenv("MAIL_FROM")
        
        if not all([self.username, self.password, self.from_email]):
            logger.warning("Email credentials not fully configured. Emails will not be sent.")
            self.is_configured = False
        else:
            self.is_configured = True
            logger.info(f"Email service initialized: {self.smtp_server}:{self.smtp_port}")
    
    def send_contact_notification(self, name: str, email: str, message: str) -> bool:
        """
        Send email notification when someone submits the contact form
        
        Args:
            name: Sender's name
            email: Sender's email
            message: Contact message
            
        Returns:
            bool: True if sent successfully, False otherwise
        """
        if not self.is_configured:
            logger.warning("Email not configured, skipping notification")
            return False
        
        try:
            msg = MIMEMultipart()
            msg['From'] = f"Portfolio Contact <{self.from_email}>"
            msg['To'] = self.from_email  # Send to yourself
            msg['Subject'] = f"🚀 New Portfolio Contact: {name}"
            msg['Reply-To'] = email  # Reply goes to the sender
            
            html_body = self._create_html_body(name, email, message)
            msg.attach(MIMEText(html_body, 'html'))
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.username, self.password)
                server.sendmail(self.from_email, self.from_email, msg.as_string())
            
            logger.info(f"Contact notification sent for: {name} <{email}>")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email: {e}")
            return False
    
    def _create_html_body(self, name: str, email: str, message: str) -> str:
        """Create HTML email body for contact notification"""
        timestamp = datetime.now().strftime("%B %d, %Y at %I:%M %p")
        
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    margin: 0; 
                    padding: 20px; 
                    background: #f5f5f5; 
                }}
                .container {{ 
                    max-width: 600px; 
                    margin: 0 auto; 
                    background: #fff; 
                    border-radius: 12px; 
                    overflow: hidden; 
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
                }}
                .header {{ 
                    background: linear-gradient(135deg, #6366f1, #8b5cf6); 
                    color: white; 
                    padding: 32px 24px; 
                    text-align: center; 
                }}
                .header h1 {{ margin: 0; font-size: 24px; }}
                .content {{ padding: 32px 24px; }}
                .field {{ 
                    background: #f8fafc; 
                    border-left: 4px solid #6366f1; 
                    padding: 16px; 
                    margin: 16px 0; 
                    border-radius: 0 8px 8px 0; 
                }}
                .field-label {{ 
                    font-size: 12px; 
                    text-transform: uppercase; 
                    color: #64748b; 
                    font-weight: 600; 
                    margin-bottom: 4px; 
                }}
                .field-value {{ font-size: 16px; color: #1e293b; }}
                .message-box {{ 
                    background: #f1f5f9; 
                    padding: 20px; 
                    border-radius: 8px; 
                    margin: 20px 0; 
                    white-space: pre-wrap;
                }}
                .footer {{ 
                    background: #f8fafc; 
                    padding: 20px 24px; 
                    text-align: center; 
                    color: #64748b; 
                    font-size: 14px; 
                    border-top: 1px solid #e2e8f0; 
                }}
                .reply-btn {{
                    display: inline-block;
                    background: #6366f1;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    margin-top: 16px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📬 New Contact Message</h1>
                    <p style="margin: 8px 0 0 0; opacity: 0.9;">Someone reached out through your portfolio!</p>
                </div>
                
                <div class="content">
                    <div class="field">
                        <div class="field-label">From</div>
                        <div class="field-value"><strong>{name}</strong></div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">Email</div>
                        <div class="field-value">{email}</div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">Received</div>
                        <div class="field-value">{timestamp}</div>
                    </div>
                    
                    <h3 style="margin: 24px 0 12px 0; color: #1e293b;">Message:</h3>
                    <div class="message-box">{message}</div>
                    
                    <div style="text-align: center;">
                        <a href="mailto:{email}" class="reply-btn">Reply to {name}</a>
                    </div>
                </div>
                
                <div class="footer">
                    <p>This message was sent from your <strong>VoidStack Portfolio</strong></p>
                </div>
            </div>
        </body>
        </html>
        """


# Global email service instance
email_service = None

def get_email_service() -> EmailService:
    """Get or create email service instance"""
    global email_service
    if email_service is None:
        email_service = EmailService()
    return email_service
