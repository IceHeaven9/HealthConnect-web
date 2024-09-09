import { Link } from 'react-router-dom';

export const HomeButtons = () => {
    return (
        <div className="flex flex-col items-center space-y-4">
            <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-64 text-center">
                Log In
            </Link>
        </div>
    );
};

