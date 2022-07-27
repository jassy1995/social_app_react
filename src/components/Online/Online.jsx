function Online({ user }) {
  return (
    <li className="flex items-center mb-4">
      <div className="relative mr-[10px]">
        <img
          src={user.profilePicture}
          alt="not exist"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="rightbarOnline w-3 h-3 rounded-full bg-green-400 absolute top-[-2px] right-0 border border-white"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}

export default Online;
