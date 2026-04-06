import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 pt-16 pb-8 border-t">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                <div>
                    <h4 className="font-bold uppercase mb-4 tracking-wider">Online Shopping</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li><a href="#" className="hover:text-secondary transition">Men</a></li>
                        <li><a href="#" className="hover:text-secondary transition">Women</a></li>
                        <li><a href="#" className="hover:text-secondary transition">Kids</a></li>
                        <li><a href="#" className="hover:text-secondary transition">Home & Living</a></li>
                        <li><a href="#" className="hover:text-secondary transition">Beauty</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold uppercase mb-4 tracking-wider">Customer Policies</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li><a href="#" className="hover:text-secondary transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-secondary transition">FAQ</a></li>
                        <li><a href="#" className="hover:text-secondary transition">T&C</a></li>
                        <li><a href="#" className="hover:text-secondary transition">Terms Of Use</a></li>
                        <li><a href="#" className="hover:text-secondary transition">Track Orders</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold uppercase mb-4 tracking-wider">Experience App</h4>
                    <div className="flex space-x-4 mb-6">
                        <img src="https://constant.myntassets.com/web/assets/img/80cc04e8-107d-43fc-87d0-972d9d0497671539674178567-google_play.png" alt="Google Play" className="h-10 cursor-pointer" />
                        <img src="https://constant.myntassets.com/web/assets/img/bc5e1ad5-3050-4c94-8196-3bc0496174b21539674178656-apple_store.png" alt="App Store" className="h-10 cursor-pointer" />
                    </div>
                    <h4 className="font-bold uppercase mb-4 tracking-wider">Keep in touch</h4>
                    <div className="flex space-x-4">
                        {/* Social Icons Placeholder */}
                        <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
                        <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
                        <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-8">
                        <span className="font-bold text-lg">100% ORIGINAL</span>
                        <span>guarantee for all products</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <span className="font-bold text-lg">Return within 30days</span>
                        <span>of receiving your order</span>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t text-center text-gray-500 text-xs">
                <p>© 2026 www.myntraclone.com. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
