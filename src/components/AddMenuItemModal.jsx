// src/components/AddMenuItemModal.jsx
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ImageUpload from './ImageUpload';

const AddMenuItemModal = ({ isOpen, onClose, restaurantId, categories }) => {
    const { addMenuItem } = useAppContext();
    // Filter out 'all' from categories for the dropdown
    const availableCategories = categories.filter(c => c !== 'all');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: availableCategories[0] || ''
    });
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        // التحقق من الاسم
        if (!formData.name.trim() || formData.name.trim().length < 3) {
            newErrors.name = 'Item name must be at least 3 characters';
        }

        // التحقق من الوصف
        if (!formData.description.trim() || formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        // التحقق من السعر - لازم يكون رقم موجب
        const price = parseFloat(formData.price);
        if (isNaN(price) || price <= 0) {
            newErrors.price = 'Price must be a positive number';
        }

        // التحقق من الصورة
        if (!formData.image) {
            newErrors.image = 'Please upload an item image';
        }

        // التحقق من التصنيف
        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }

        // لو في أخطاء، بنوقف هنا
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        addMenuItem({
            ...formData,
            name: formData.name.trim(),
            description: formData.description.trim(),
            restaurantId,
            price: price,
            isPopular: false,
            isVegetarian: false
        });
        onClose();
        // Reset form
        setFormData({ name: '', description: '', price: '', image: '', category: availableCategories[0] || '' });
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
                        <h2 className="text-xl font-bold">Add New Menu Item</h2>
                        <button onClick={onClose} className="text-white/80 hover:text-white">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary-orange focus:ring-1 focus:ring-primary-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            placeholder="e.g. Cheese Burger"
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
                            placeholder="Ingredients, details..."
                        ></textarea>
                        {errors.description && (
                            <p className="mt-1 text-sm text-error">{errors.description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                required
                                min="0.01"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary-orange focus:ring-1 focus:ring-primary-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                placeholder="0.00"
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-error">{errors.price}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category</label>
                            <select
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-primary-orange focus:ring-1 focus:ring-primary-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            >
                                {availableCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-error">{errors.category}</p>
                            )}
                        </div>
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

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-primary-orange px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-orange-dark focus:outline-none focus:ring-4 focus:ring-primary-orange/30 transition-all shadow-lg hover:shadow-primary-orange/40"
                    >
                        Add Menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMenuItemModal;
