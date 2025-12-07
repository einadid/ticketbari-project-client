import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCloudUploadAlt, FaCheckCircle, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { DEFAULT_IMAGES } from '../../../utils/constants';

const img_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddTicket = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // ✅ File state আলাদা রাখা
  const [selectedFileName, setSelectedFileName] = useState('');
  
  const { register, handleSubmit, reset, watch } = useForm();
  const watchTransportType = watch('transportType', 'bus');

  // ✅ Handle image change - File আলাদাভাবে store করা
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // ✅ File আলাদা state এ রাখা
      setSelectedFileName(file.name);
      
      // Preview তৈরি করা
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Clear selected image
  const clearImage = () => {
    setSelectedFile(null);
    setSelectedFileName('');
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('imageUpload');
    if (fileInput) fileInput.value = '';
  };

  const onSubmit = async (data) => {
    setLoading(true);
    
    let imageUrl = '';

    try {
      // ✅ Check করা হচ্ছে selectedFile থেকে, data.image থেকে না
      if (selectedFile) {
        console.log("📤 Uploading custom image...", selectedFile.name);
        
        const formData = new FormData();
        formData.append('image', selectedFile);
        
        const res = await axios.post(img_hosting_url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (res.data.success) {
          imageUrl = res.data.data.display_url;
          console.log("✅ Custom image uploaded:", imageUrl);
        } else {
          console.log("⚠️ Upload failed, using default image");
          imageUrl = DEFAULT_IMAGES[data.transportType] || DEFAULT_IMAGES.bus;
        }
      } else {
        // ইমেজ না দিলে ডিফল্ট ব্যবহার
        imageUrl = DEFAULT_IMAGES[data.transportType] || DEFAULT_IMAGES.bus;
        console.log("ℹ️ No image provided, using default:", imageUrl);
      }

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
        image: imageUrl,
        perks: perks,
        vendorName: user?.displayName,
        vendorEmail: user?.email,
        verificationStatus: 'pending',
        isAdvertised: false,
        isHidden: false,
        createdAt: new Date()
      };

      console.log("📦 Ticket Data:", ticketData);

      const ticketRes = await axiosSecure.post('/tickets', ticketData);
      
      if (ticketRes.data.insertedId) {
        reset();
        clearImage();
        toast.success('Ticket added successfully! Waiting for admin approval.');
        navigate('/dashboard/my-added-tickets');
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(error.response?.data?.message || 'Failed to add ticket');
    } finally {
      setLoading(false);
    }
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
              <label className="label-text">Ticket Title <span className="text-red-500">*</span></label>
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
                <label className="label-text">From Location <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Departure City" 
                  {...register('fromLocation', { required: true })}
                  className="input-field w-full" 
                />
              </div>

              {/* To Location */}
              <div>
                <label className="label-text">To Location <span className="text-red-500">*</span></label>
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
                <label className="label-text">Transport Type <span className="text-red-500">*</span></label>
                <select 
                  {...register('transportType', { required: true })}
                  className="input-field w-full"
                >
                  <option value="bus">🚌 Bus</option>
                  <option value="train">🚂 Train</option>
                  <option value="launch">🚢 Launch</option>
                  <option value="plane">✈️ Plane</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="label-text">Price (Per Seat) <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  placeholder="Ex: 1200" 
                  {...register('price', { required: true, min: 1 })}
                  className="input-field w-full" 
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="label-text">Total Seats <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  placeholder="Ex: 40" 
                  {...register('ticketQuantity', { required: true, min: 1 })}
                  className="input-field w-full" 
                />
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <label className="label-text">Departure Date & Time <span className="text-red-500">*</span></label>
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
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <input type="checkbox" {...register('ac')} className="checkbox checkbox-primary checkbox-sm" />
                  <span className="text-gray-700 dark:text-gray-300">❄️ AC</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <input type="checkbox" {...register('wifi')} className="checkbox checkbox-primary checkbox-sm" />
                  <span className="text-gray-700 dark:text-gray-300">📶 WiFi</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <input type="checkbox" {...register('food')} className="checkbox checkbox-primary checkbox-sm" />
                  <span className="text-gray-700 dark:text-gray-300">🍔 Food</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <input type="checkbox" {...register('charging')} className="checkbox checkbox-primary checkbox-sm" />
                  <span className="text-gray-700 dark:text-gray-300">🔌 Charging Port</span>
                </label>
              </div>
            </div>

            {/* ✅ Fixed Image Upload */}
            <div>
              <label className="label-text">
                Ticket Image 
                <span className="text-gray-400 text-sm ml-2">(Optional)</span>
              </label>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-primary transition-colors">
                {/* ✅ File Input - register ছাড়া, শুধু onChange দিয়ে */}
                <input 
                  type="file" 
                  className="hidden" 
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                
                {imagePreview ? (
                  // ✅ Image Selected - Show Preview
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-40 h-28 object-cover rounded-lg border-2 border-green-400"
                    />
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <FaTimes size={12} />
                    </button>
                    <div className="flex items-center justify-center gap-2 text-green-600 mt-2">
                      <FaCheckCircle />
                      <span className="text-sm truncate max-w-[150px]">{selectedFileName}</span>
                    </div>
                    <label 
                      htmlFor="imageUpload" 
                      className="text-xs text-blue-500 cursor-pointer hover:underline mt-1 block"
                    >
                      Click to change
                    </label>
                  </div>
                ) : (
                  // ✅ No Image Selected - Show Upload Button
                  <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center gap-2">
                    <FaCloudUploadAlt className="text-4xl text-gray-400" />
                    <span className="text-gray-500">Click to upload image</span>
                    <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
                  </label>
                )}
              </div>

              {/* ✅ Default Image Info - Only show when no custom image */}
              {!imagePreview && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center gap-3">
                  <img 
                    src={DEFAULT_IMAGES[watchTransportType] || DEFAULT_IMAGES.bus} 
                    alt="Default" 
                    className="w-16 h-12 object-cover rounded-lg border-2 border-blue-200"
                  />
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      ℹ️ Default image will be used for <strong>{watchTransportType}</strong>
                    </p>
                    <p className="text-xs text-gray-500">You can upload your own image above</p>
                  </div>
                </div>
              )}
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
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                  <span>Adding Ticket...</span>
                </>
              ) : (
                <>
                  <FaPlus />
                  <span>Add Ticket</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTicket;