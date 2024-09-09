import { HomeButtons } from './homeButtons';

export const HomeContent = () => {
    return (
        <main className="flex flex-1 items-center justify-center flex-col bg-white p-6">
            <p className="text-blue-700 text-center max-w-2xl">
                Your health, simplified. We make it easy to book appointments with top healthcare professionals, and we’re here to help you.
                <br /><br />
                <strong className="text-blue-800">Why Choose Us?</strong>
                <br />
                <ul className="list-disc list-inside pl-5 mt-2">
                    <li>Expert Care: Connect with qualified doctors across various specialties.</li>
                    <li>Easy Booking: Schedule your appointments online with just a few clicks.</li>
                    <li>No Waiting: Choose the time that works best for you.</li>
                    <li>Secure and Private: Your medical information is protected with us.</li>
                </ul>
                <br />
                Join today and take control of your health with ease!
            </p>
            <HomeButtons />
        </main>
    );
};

