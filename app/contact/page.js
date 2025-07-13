'use client';

export default function AdminDashboardPage() {
  return (
    <div className="text-2xl font-bold">
      <div className="text-center text-white bg-red-900 border-8 border-amber-700 border-double rounded-full">
        <h1 className="mb-3 mt-3 font-mono">Reach Out & Rescue a Life</h1>
      </div>

      {/*  */}
      <div className="mt-8 max-w-md mx-auto">
        <h2 className="text-lg font-mono text-center mb-4">💬 Send us a Message</h2>
        <form className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-red-900 mb-1">Name *</label>
            <input type="text" id="name" name="name" required className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500" placeholder="Your full name"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-red-900 mb-1">Email *</label>
            <input type="email" id="email" name="email" required className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500" placeholder="your.email@example.com"/>
          </div>
          <div>
            <label htmlFor="subject" className="block text-xs font-medium text-red-900 mb-1">Subject *</label>
            <select id="subject" name="subject" required className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500">
              <option value="">Select a topic</option>
              <option value="adoption">Adoption Inquiry</option>
              <option value="foster">Foster Application</option>
              <option value="volunteer">Volunteer Opportunity</option>
              <option value="donation">Donation Question</option>
              <option value="general">General Question</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-medium text-red-900 mb-1">Message *</label>
            <textarea id="message" name="message" required rows="3" className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500" placeholder="Tell us how we can help you..."></textarea>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="newsletter" name="newsletter" className="h-3 w-3 text-red-600 focus:ring-red-500 border-gray-300 rounded"/>
            <label htmlFor="newsletter" className="ml-2 block text-xs text-red-900">Subscribe to our newsletter</label>
          </div>
          <button type="submit" className="mb-4 w-full bg-red-900 text-white py-2 px-4 rounded text-sm hover:bg-red-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1 transition-colors duration-200 font-medium">Send Message 🐾</button>
        </form>
      </div>
        
      {/*  */}
      <div className="mt-8 text-red-900 border-b-3 border-t-3 font-light text-center text-lg">
        <p className="mb-6 mt-6">We’re here to help you find your new best friend! Whether you're looking to adopt, foster, volunteer, or simply have a question, feel free to get in touch. 🐾</p>
      </div>

      {/*  */}
      <div className="text-center justify-center text-red-900 mt-10 border-b-3">
        {/*  */}
        <div className="mt-10 text-lg">
          <h2 className="font-mono">📍 Visit Us:</h2>
          <p className="mt-2 font-normal">2412 Maple Tail Crescent SE Calgary, AB T2G 1Y5</p>
        </div>
        {/*  */}
        <div className="mt-10 text-lg">
          <h2 className="font-mono">📞 Phone:</h2>
          <p className="font-normal">(403) 555-8964 (Please leave a message if we’re with the animals!)</p>
        </div>
       {/*  */}
        <div>
          <h2 className="text-lg font-mono mt-10">📧 Email:</h2>
          <p className="mb-6"><a href="mailto:info@mapleleafrescue.ca" className="text-red-900 hover:text-black underline text-lg font-normal">info@mapleleafrescue.ca</a></p>
        </div>
      </div>
    </div>
  );
}