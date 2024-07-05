

const Navbar = ({ userName, userInitials }) => {
  return (
    <nav className="fixed top-0  w-4/5 bg-white shadow-md py-4 px-6 flex items-center justify-between z-10">
      {/* Title on the left */}
      <h1 className="text-gray-800 text-2xl font-bold">Customers</h1>

      {/* User information on the right */}
      <div className="flex items-center">
        <div className="bg-gray-300 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center mr-2">
          <span className="text-sm font-bold">{userInitials}</span>
        </div>
        <span className="text-gray-800 text-lg font-semibold">{userName}</span>
      </div>
    </nav>
  );
};

export default Navbar;
