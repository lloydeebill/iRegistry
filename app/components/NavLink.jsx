import Link from "next/link";

const NavLink = ({href,title}) => {
    return (
        <Link 
            href={href} 
            className='block py-2 pl-3 pr-4 text-xl rounded md:p-0 hover:text-blue-400'>
            {title}
        </Link>
    );
};

export default NavLink; 