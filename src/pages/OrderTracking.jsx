import React from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';

const OrderTracking = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold mb-10 text-center uppercase">Order Summary</h2>
            <div className="bg-white border rounded-lg p-8 space-y-8 shadow-sm">
                <div className="flex justify-between items-center border-b pb-6">
                    <div>
                        <p className="text-gray-500 text-sm">Order ID: #ORD-2026-X99</p>
                        <p className="font-bold">Estimated Delivery: 25 Feb, 2026</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded text-sm font-bold uppercase tracking-wider">In Transit</span>
                </div>

                <div className="relative">
                    <div className="absolute left-6 h-full border-l-2 border-primary border-dashed top-0"></div>
                    <div className="space-y-12">
                        <div className="flex items-start space-x-6 relative">
                            <div className="bg-primary text-white p-2 rounded-full z-10">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold">Order Placed</h4>
                                <p className="text-sm text-gray-500">20 Feb, 2026 - 10:45 AM</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6 relative">
                            <div className="bg-primary text-white p-2 rounded-full z-10 animate-pulse">
                                <Package size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold">Shipped from Hub</h4>
                                <p className="text-sm text-gray-500">20 Feb, 2026 - 02:30 PM (Expected)</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6 relative opacity-30">
                            <div className="bg-gray-400 text-white p-2 rounded-full z-10">
                                <Truck size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold">Out for Delivery</h4>
                                <p className="text-sm text-gray-500">Pending</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
