import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const getEmailTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || '465');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const missing: string[] = [];
  if (!user) missing.push('SMTP_USER');
  if (!pass) missing.push('SMTP_PASS');

  if (!host || missing.length > 0) {
    return {
      transporter: null,
      missing,
    };
  }

  return {
    transporter: nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    }),
    missing,
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, title, message } = body;

    // Validation
    if (!name || !email || !title || !message) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ tất cả các trường' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Địa chỉ email không hợp lệ' },
        { status: 400 }
      );
    }

    // Create contact in database
    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        title: title.trim(),
        message: message.trim(),
      },
    });

    const { transporter, missing } = getEmailTransporter();
    const fallbackAddress = 'mathsignvietnam8687@gmail.com';
    const recipient = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || fallbackAddress;
    const sender = process.env.CONTACT_SENDER_EMAIL || process.env.SMTP_USER || fallbackAddress;

    if (!transporter) {
      const missingText = missing.length ? missing.join(', ') : 'SMTP_USER hoặc SMTP_PASS';
      return NextResponse.json(
        {
          error:
            `Thiếu cấu hình ${missingText}. Tin nhắn đã được lưu, nhưng email chưa được gửi.`,
        },
        { status: 500 }
      );
    }

    await transporter.sendMail({
      from: `MathSign Contact <${sender}>`,
      to: recipient,
      replyTo: email.trim(),
      subject: `[MathSign] ${title.trim()}`,
      text: [
        `Nguoi gui: ${name.trim()}`,
        `Email: ${email.trim()}`,
        '',
        'Noi dung:',
        message.trim(),
      ].join('\n'),
      html: `
        <h2>Tin nhan moi tu trang lien he MathSign</h2>
        <p><strong>Người gửi:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <p><strong>Tiêu đề:</strong> ${title.trim()}</p>
        <hr />
        <p style="white-space: pre-line;">${message.trim()}</p>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Tin nhắn đã được gửi thành công và email đã được chuyển tới MathSign!',
        contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    const message = error instanceof Error ? error.message : '';
    if (message.includes('Invalid login') || message.includes('auth')) {
      return NextResponse.json(
        { error: 'Không thể đăng nhập SMTP. Kiểm tra SMTP_USER và SMTP_PASS (App Password Gmail).' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve contacts (for admin)
export async function GET(request: NextRequest) {
  try {
    // You can add authentication here if needed
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
