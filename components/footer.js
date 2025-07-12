export default function Footer() {
  return (
    <footer className="bg-white border-t py-4 mt-12 shadow-inner">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-white">
        <p>&copy; {new Date().getFullYear()} Maple Leaf Animal Rescue. All rights reserved.</p>
      </div>
    </footer>
  );
}