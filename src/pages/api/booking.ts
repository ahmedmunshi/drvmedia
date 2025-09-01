import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Check honeypot field for spam protection
    if (formData.get('website')) {
      return new Response(JSON.stringify({ success: false, message: 'Spam detected' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Extract form data
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const projectType = formData.get('projectType')?.toString() || '';
    const timeline = formData.get('timeline')?.toString() || '';
    const projectDetails = formData.get('projectDetails')?.toString() || '';
    const referral = formData.get('referral')?.toString() || 'Not specified';
    
    // Validate required fields
    if (!name || !email || !projectType || !timeline || !projectDetails) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Missing required fields' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Format the email content
    const emailSubject = `New Booking Inquiry from ${name}`;
    const emailBody = `
New Photography Booking Inquiry

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || 'Not provided'}

Project Details:
- Type: ${projectType}
- Timeline: ${timeline}
- How they heard about me: ${referral}

Project Description:
${projectDetails}

---
Inquiry submitted on: ${new Date().toLocaleString('en-US', { 
  timeZone: 'Africa/Lusaka',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})} (Lusaka time)
    `.trim();
    
    // In a real application, you would send this email using a service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - Mailgun
    // - Netlify Functions with email service
    // 
    // For now, we'll simulate success and log the data
    console.log('=== NEW BOOKING INQUIRY ===');
    console.log('Subject:', emailSubject);
    console.log('Body:', emailBody);
    console.log('===========================');
    
    // Here's where you would integrate your email service
    // Example with a hypothetical email service:
    /*
    await sendEmail({
      to: 'lateoptics@gmail.com',
      subject: emailSubject,
      text: emailBody,
      replyTo: email
    });
    */
    
    // For development, you might want to save to a file or database
    // This ensures you don't lose leads during development
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Booking inquiry submitted successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Booking form error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};