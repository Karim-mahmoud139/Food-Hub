// src/components/AddRestaurantModal.jsx
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ImageUpload from './ImageUpload';

const AddRestaurantModal = ({ isOpen, onClose }) => {
    const { addRestaurant } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        deliveryTime: '',
        minimumOrder: '',
        categories: ''
    });
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        // التحقق من الاسم
        if (!formData.name.trim() || formData.name.trim().length < 3) {
            newErrors.name = 'Restaurant name must be at least 3 characters';
        }

        // التحقق من الوصف
        if (!formData.description.trim() || formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        // التحقق من الصورة
        if (!formData.image) {
            newErrors.image = 'Please upload a restaurant image';
        }

        // التحقق من وقت التوصيل - لازم يكون بصيغة معينة
        const deliveryTimeRegex = /^\d+-\d+\s*(min|mins|minutes)$/i;
        if (!formData.deliveryTime.trim() || !deliveryTimeRegex.test(formData.deliveryTime.trim())) {
            newErrors.deliveryTime = 'Delivery time must be in format: "30-45 min"';
        }

        // التحقق من الحد الأدنى للطلب - لازم يكون رقم موجب
        const minOrder = parseFloat(formData.minimumOrder);
        if (isNaN(minOrder) || minOrder < 0) {
            newErrors.minimumOrder = 'Minimum order must be a positive number';
        }

        // التحقق من التصنيفات
        const categoriesArray = formData.categories.split(',').map(c => c.trim()).filter(c => c);
        if (categoriesArray.length === 0) {
            newErrors.categories = 'Please add at least one category';
        }

        // لو في أخطاء، بنوقف هنا
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        addRestaurant({
            ...formData,
            name: formData.name.trim(),
            description: formData.description.trim(),
            deliveryTime: formData.deliveryTime.trim(),
            categories: categoriesArray,
            minimumOrder: minOrder
        });
        onClose();
        // Reset form
        setFormData({ name: '', description: '', image: '', deliveryTime: '', minimumOrder: '', categories: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30">
            <div
                className="absolute inset-0"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl transition-all dark:bg-slate-800 dark:border dark:border-slate-700 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-primary-orange p-4 text-white sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Add New Restaurant</h2>
                        <button onClick={onClose} className="text-white/80 hover:text-white">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Restaurant Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary-orange focus:ring-1 focus:ring-primary-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            placeholder="e.g. Burger King"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-error">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description</label>
                        <textarea
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            rows="2"
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary-orange focus:ring-1 focus:ring-primary-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            placeholder="Short description..."
                        ></textarea>
                        {errors.description && (
                            <p className="mt-1 text-sm text-error">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <ImageUpload
                            onImageSelect={(imageData) => {
                                setFormData(prev => ({ ...prev, image: imageData }));
                                if (errors.image) {
                                    setErrors(prev => ({ ...prev, image: '' }));
                                }
                            }}
                            initialImage={formData.image}
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-error">{errors.image}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Delivery Time</label>
                            <input
                                type="text"
                                name="deliveryTime"
                                required
                                value={formData.deliveryTime}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary-orange focus:ring-1 focus:ring-primary-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                placeholder="e.g. 30-45 min"
                            />
                            {errors.deliveryTime && (
                                <p className="mt-1 text-sm text-error">{errors.deliveryTime}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Min Order ($)</label>
                            <input
                                type="number"
                                name="minimumOrder"
                                required
                                min="0"
                                step="0.01"
                                value={formData.minimumOrder}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary-orange focus:ring-1 focus:ring-primary-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                placeholder="0.00"
                            />
                            {errors.minimumOrder && (
                                <p className="mt-1 text-sm text-error">{errors.minimumOrder}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Categories (comma separated)</label>
                        <input
                            type="text"
                            name="categories"
                            required
                            value={formData.categories}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary-orange focus:ring-1 focus:ring-primary-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            placeholder="burger, fast food, drinks"
                        />
                        {errors.categories && (
                            <p className="mt-1 text-sm text-error">{errors.categories}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-primary-orange px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-orange-dark focus:outline-none focus:ring-4 focus:ring-primary-orange/30 transition-all shadow-lg hover:shadow-primary-orange/40"
                    >
                        Add Restaurant
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRestaurantModal;
