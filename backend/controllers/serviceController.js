import Service from '../models/Service.js';
import { initialServices, initialCategories } from '../seed/mockData.js';

// @desc    Get all service categories and providers
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    let services = [];
    try {
      services = await Service.find({});
    } catch {
      // Fallback
    }

    if (!services || services.length === 0) {
      services = initialServices;
    }

    const { search } = req.query;
    if (search) {
      services = services.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.role.toLowerCase().includes(search.toLowerCase()) ||
        (s.categoryName && s.categoryName.toLowerCase().includes(search.toLowerCase()))
      );
    }

    return res.status(200).json({
      success: true,
      count: services.length,
      categories: initialCategories,
      services
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single provider/service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    let service = null;

    try {
      service = await Service.findOne({ id: String(id) });
    } catch {
      // Fallback
    }

    if (!service) {
      service = initialServices.find(s => String(s.id) === String(id));
    }

    if (!service) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    // Get group members
    const groupMembers = initialServices.filter(s => s.group === service.group).map(s => String(s.id));

    return res.status(200).json({
      success: true,
      service,
      groupMembers
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
