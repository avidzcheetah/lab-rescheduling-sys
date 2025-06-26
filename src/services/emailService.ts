import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAIL_SERVICE_ID = 'your_service_id';
const EMAIL_TEMPLATE_ID = 'your_template_id';
const EMAIL_PUBLIC_KEY = 'your_public_key';

// Initialize EmailJS
emailjs.init(EMAIL_PUBLIC_KEY);

interface EmailParams {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
  from_name?: string;
}

export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      params
    );
    
    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Send notification for reschedule request status
export const sendRescheduleNotification = async (
  studentEmail: string,
  studentName: string,
  status: 'approved' | 'rejected',
  subject: string,
  newDate?: string,
  newTime?: string
): Promise<boolean> => {
  const isApproved = status === 'approved';
  
  const message = isApproved
    ? `Your reschedule request for ${subject} has been approved. 
       ${newDate && newTime ? `New schedule: ${newDate} at ${newTime}` : 'You will receive the new schedule details soon.'}`
    : `Your reschedule request for ${subject} has been rejected. Please contact your coordinator for more information.`;

  return await sendEmail({
    to_email: studentEmail,
    to_name: studentName,
    subject: `Lab Reschedule Request ${isApproved ? 'Approved' : 'Rejected'}`,
    message: message,
    from_name: 'Lab Management System'
  });
};

// Send schedule notification
export const sendScheduleNotification = async (
  recipientEmail: string,
  recipientName: string,
  scheduleDetails: {
    subject: string;
    date: string;
    time: string;
    location: string;
    labName: string;
  }
): Promise<boolean> => {
  const message = `
    New lab schedule created:
    
    Subject: ${scheduleDetails.subject}
    Date: ${scheduleDetails.date}
    Time: ${scheduleDetails.time}
    Lab: ${scheduleDetails.labName}
    Location: ${scheduleDetails.location}
    
    Please make sure to attend the lab session at the scheduled time.
  `;

  return await sendEmail({
    to_email: recipientEmail,
    to_name: recipientName,
    subject: `New Lab Schedule - ${scheduleDetails.subject}`,
    message: message,
    from_name: 'Lab Management System'
  });
};

// Send bulk notifications
export const sendBulkNotifications = async (
  recipients: Array<{ email: string; name: string }>,
  subject: string,
  message: string
): Promise<boolean[]> => {
  const promises = recipients.map(recipient =>
    sendEmail({
      to_email: recipient.email,
      to_name: recipient.name,
      subject: subject,
      message: message,
      from_name: 'Lab Management System'
    })
  );

  return await Promise.all(promises);
};