'use client';

export default function AdminDashboardPage() {
  return (
    // General layout design
    <div className="text-2xl font-bold">

      {/* Title of the page */}
      <div className="text-center text-white bg-red-900 border-4 border-double rounded-full">
        {/* Title of the page */}
          <h1 className="mb-3 mt-3 font-normal">Giving Every Animal a Second Chance</h1>
      </div>

      {/* The main paragraoh of the introduction of the association */}
      <div className="mt-8 text-red-900 border-b-4">
        <h1 className="font-stretch-expanded tracking-wide">
            Welcome to Maple leaf Animal Rescue, where hearts meet paws and second chances begin.
        </h1>
        <p className="mt-9 text-base">We’re a passionate team of animal lovers, rescuers, and volunteers who believe every animal deserves a safe, loving home. Since our founding in 2025, we've dedicated ourselves to rescuing, rehabilitating, and rehoming abandoned, abused, and homeless animals across Calgary,Canada.</p>
        <p className="mt-4 text-base mb-10">At Maple Leaf Animal Rescue, we work closely with local shelters, foster families, and veterinarians to ensure every animal gets the care, attention, and love they need. Whether it’s a playful puppy, a gentle senior cat, or a misunderstood mutt ~ we believe each one has a story worth hearing and a future worth fighting for.</p>
      </div>

      {/* Three main missions */}
      <div className="mt-9 font-medium flex justify-center text-red-900">
        <ul className="text-left font-medium">
          <h2 className="mb-3 font-black">Our mission is simple:</h2>
          <li> - Rescue those in need</li> 
          <li> - Rehabilitate with compassion</li>
          <li> - Rehome with care and commitment</li>        
        </ul>
      </div>

      {/* More explainations */}
      <div className="mt-10 border-t-4 text-base text-red-900">
        <p className="mt-10">We also believe in building a community. Through adoption events, educational programs, and volunteer opportunities, we aim to connect people with animals — and with each other.</p>
        <p className="mt-4">By adopting through Maple Leaf Animal Rescue, you're not just saving one life. You're making space for another. You're becoming a hero in the eyes of an animal who only wants to love and be loved.</p>
      </div>

      {/* Call to action */}
      <div className="text-center mt-10 border-t-3 text-red-900">
        <h1 className="mt-9">Ready to find your new best friend? 🐶🐱</h1>
        <h1 className="mt-2">Let’s change lives together — one paw at a time.</h1>
      </div>
    </div>
  );
}
