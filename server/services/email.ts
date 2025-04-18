import sgMail from '@sendgrid/mail';
import { PositioningOutput } from './openai';
import { FormData } from '../../client/src/components/step-form';

// Initialize SendGrid with the API key from environment variables
// We'll initialize it lazily in the send function to ensure it's always up-to-date
// This is more compatible with deployment platforms like Render

// Log status without exposing the actual key
if (!process.env.SENDGRID_API_KEY) {
  console.warn('WARNING: SENDGRID_API_KEY environment variable is not set. Email functionality will not work.');
}

interface SendEmailOptions {
  to: string;
  positioningOutput: PositioningOutput;
  formData: FormData;
}

/**
 * Sends an email with the positioning results to the user
 */
export async function sendPositioningEmail({ to, positioningOutput, formData }: SendEmailOptions): Promise<boolean> {
  const { 
    websiteHeadline, 
    socialBio, 
    ctaPhrase, 
    ctaSubheadline, 
    summary 
  } = positioningOutput;

  // Create HTML email content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(to right, #4F46E5, #3B82F6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { padding: 20px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; }
          h1 { margin: 0; font-size: 24px; }
          h2 { font-size: 20px; margin-top: 30px; color: #4F46E5; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
          .section { margin-bottom: 25px; background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          .footer { margin-top: 30px; text-align: center; font-size: 14px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Your PositionKit Results</h1>
        </div>
        <div class="content">
          <p>Here are your personalized positioning results based on your inputs:</p>
          
          <h2>Website Headline</h2>
          <div class="section">
            <p>${websiteHeadline}</p>
          </div>
          
          <h2>Social Media Bio</h2>
          <div class="section">
            <p>${socialBio}</p>
          </div>
          
          <h2>Call-to-Action</h2>
          <div class="section">
            <p><strong>${ctaPhrase}</strong></p>
            <p>${ctaSubheadline}</p>
          </div>
          
          <h2>Brand Summary</h2>
          <div class="section">
            <p>${summary}</p>
          </div>
          
          <h2>Your Inputs</h2>
          <div class="section">
            <ul style="padding-left: 20px;">
              <li><strong>What you do:</strong> ${formData.workDescription}</li>
              <li><strong>Service/offer:</strong> ${formData.service}</li>
              <li><strong>Transformation:</strong> ${formData.transformation}</li>
              <li><strong>Target audience:</strong> ${formData.audience}</li>
              <li><strong>Pain points:</strong> ${formData.painPoints}</li>
              ${formData.misunderstanding ? `<li><strong>Misunderstandings:</strong> ${formData.misunderstanding}</li>` : ''}
            </ul>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} PositionKit. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Create plain text version as fallback
  const textContent = `
YOUR POSITIONKIT RESULTS
========================

WEBSITE HEADLINE
---------------
${websiteHeadline}

SOCIAL BIO (INSTAGRAM/LINKEDIN)
-----------------------------
${socialBio}

CALL-TO-ACTION
-------------
${ctaPhrase}
${ctaSubheadline}

BRAND SUMMARY
------------
${summary}

YOUR INPUTS
----------
- What you do: ${formData.workDescription}
- Service/offer: ${formData.service}
- Transformation: ${formData.transformation}
- Target audience: ${formData.audience}
- Pain points: ${formData.painPoints}
${formData.misunderstanding ? `- Misunderstandings: ${formData.misunderstanding}` : ''}

========================
© ${new Date().getFullYear()} PositionKit. All rights reserved.
  `;

  // Prepare the email
  const msg = {
    to,
    from: 'noreply@positionkit.com', // Use your verified sender in SendGrid
    subject: 'Your PositionKit Results',
    text: textContent,
    html: htmlContent,
  };

  try {
    // Lazy initialization of SendGrid with API key from environment
    // This ensures we always use the most current environment variable
    // and is more compatible with deployment platforms like Render
    if (!process.env.SENDGRID_API_KEY) {
      console.error('Cannot send email: SENDGRID_API_KEY environment variable is not set');
      return false;
    }
    
    // Set the API key right before sending
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // Send the email
    await sgMail.send(msg);
    console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}