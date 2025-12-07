import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FaBus, FaTrain, FaShip, FaPlane, FaPlus, FaCloudUploadAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const img_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddTicket = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    
    // Image Upload to imgbb
    const imageFile = { image: data.image[0] };
    const res = await axios.post(img_hosting_url, imageFile, {
      headers: { 'content-type': 'multipart/form-data' }
    });

    if (res.data.success) {
      // Perks Array তৈরি করা
      const perks = [];
      if (data.ac) perks.push('AC');
      if (data.wifi) perks.push('WiFi');
      if (data.food) perks.push('Food');
      if (data.charging) perks.push('Charging Port');

      const ticketData = {
        title: data.title,
        fromLocation: data.fromLocation,
        toLocation: data.toLocation,
        transportType: data.transportType,
        price: parseFloat(data.price),
        ticketQuantity: parseInt(data.ticketQuantity),
        departureDateTime: data.departureDateTime,
        image: res.data.data.display_url,
        perks: perks,
        vendorName: user?.displayName,
        vendorEmail: user?.email,
        verificationStatus: 'pending',
        isAdvertised: false,
        isHidden: false,
        createdAt: new Date()
      };

      try {
        const ticketRes = await axiosSecure.post('/tickets', ticketData);
        if (ticketRes.data.insertedId) {
          reset();
          toast.success('Ticket added successfully! Waiting for admin approval.');
          navigate('/dashboard/my-added-tickets');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to add ticket');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Add Ticket | TicketBari</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
          <FaPlus className="text-primary" /> Add New Ticket
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="label-text">Ticket Title</label>
              <input 
                type="text" 
                placeholder="Ex: Dhaka to Cox's Bazar AC Bus" 
                {...register('title', { required: true })}
                className="input-field w-full" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From Location */}
              <div>
                <label className="label-text">From Location</label>
                <input 
                  type="text" 
                  placeholder="Departure City" 
                  {...register('fromLocation', { required: true })}
                  className="input-field w-full" 
                />
              </div>

              {/* To Location */}
              <div>
                <label className="label-text">To Location</label>
                <input 
                  type="text" 
                  placeholder="Arrival City" 
                  {...register('toLocation', { required: true })}
                  className="input-field w-full" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Transport Type */}
              <div>
                <label className="label-text">Transport Type</label>
                <select 
                  {...register('transportType', { required: true })}
                  className="input-field w-full"
                >
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="launch">Launch</option>
                  <option value="plane">Plane</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="label-text">Price (Per Seat)</label>
                <input 
                  type="number" 
                  placeholder="Ex: 1200" 
                  {...register('price', { required: true })}
                  className="input-field w-full" 
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="label-text">Total Seats</label>
                <input 
                  type="number" 
                  placeholder="Ex: 40" 
                  {...register('ticketQuantity', { required: true })}
                  className="input-field w-full" 
                />
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <label className="label-text">Departure Date & Time</label>
              <input 
                type="datetime-local" 
                {...register('departureDateTime', { required: true })}
                className="input-field w-full" 
              />
            </div>

            {/* Perks */}
            <div>
              <label className="label-text mb-2 block">Perks & Amenities</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <input type="checkbox" {...register('ac')} className="checkbox checkbox-primary checkbox-sm" />
                  <span className="text-gray-700 dark:text-gray-300">AC</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <input type="checkbox" {...register('wifi')} className="checkbox checkbox-primary checkbox-sm" />
                  <span className="text-gray-700 dark:text-gray-300">WiFi</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <input type="checkbox" {...register('food')} className="checkbox checkbox-primary checkbox-sm" />
                  <span className="text-gray-700 dark:text-gray-300">Food</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <input type="checkbox" {...register('charging')} className="checkbox checkbox-primary checkbox-sm" />
                  <span className="text-gray-700 dark:text-gray-300">Charging Port</span>
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="label-text">Ticket Image</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                <input 
                  type="file" 
                  {...register('image', { required: true })}
                  className="hidden" 
                  id="imageUpload"
                  accept="image/*"
                />
                <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center gap-2">
                  <FaCloudUploadAlt className="text-4xl text-gray-400" />
                  <span className="text-gray-500">Click to upload image</span>
                </label>
              </div>
            </div>

            {/* Vendor Info (Read-only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
              <div>
                <label className="text-xs text-gray-500">Vendor Name</label>
                <p className="font-semibold text-gray-800 dark:text-white">{user?.displayName}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Vendor Email</label>
                <p className="font-semibold text-gray-800 dark:text-white">{user?.email}</p>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <span className="loading loading-spinner loading-md"></span> : 'Add Ticket'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTicket;