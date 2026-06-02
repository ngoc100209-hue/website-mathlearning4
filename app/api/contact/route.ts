import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

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

    return NextResponse.json(
      {
        success: true,
        message: 'Tin nhắn đã được gửi thành công!',
        contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
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
