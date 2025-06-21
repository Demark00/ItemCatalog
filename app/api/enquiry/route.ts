import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { itemName, itemId, userEmail, message } = await req.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP settings
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Compose email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL || process.env.EMAIL_USER,
      subject: `Enquiry for ${itemName}`,
      html: `
        <h2>Enquiry Received</h2>
        <p><strong>Item:</strong> ${itemName} (ID: ${itemId})</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>From:</strong> ${userEmail}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Enquiry sent successfully" });
  } catch (error) {
    console.error("Failed to send enquiry email:", error);
    return NextResponse.json({ success: false, message: "Failed to send enquiry" }, { status: 500 });
  }
}
