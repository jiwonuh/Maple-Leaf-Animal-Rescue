'use client';

import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-[#932421] text-center">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <Image
            src="/placeholder-map.png"
            alt="Map location"
            width={600}
            height={400}
            className="rounded shadow"
          />
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <h2 className="text-xl font-semibold mb-1">Address</h2>
            <p>123 Maple Leaf Blvd SE<br />Calgary, AB T2G 1A1</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Phone</h2>
            <p>(403) 555-1234</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Email</h2>
            <p>contact@mlar.ca</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Hours</h2>
            <p>
              Mon–Fri: 9:00 AM – 5:00 PM<br />
              Sat: 10:00 AM – 4:00 PM<br />
              Sun & Holidays: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
