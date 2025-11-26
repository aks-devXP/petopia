const CrueltyReport = require('../../Models/NGO/CrueltyReportDB');

/**
 * POST /cruelty-report
 * Body is already validated by validateCrueltyReport middleware
 */
const createReport = async (req, res) => {
  try {
    const data = req.body||req.body.report;
    const report = await CrueltyReport.create(data);

    return res.status(201).json({
      success: true,
      message: 'Cruelty report created successfully',
      // data: report,
    });
  } catch (err) {
    console.error('Create cruelty report error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to create cruelty report',
    });
  }
};

/**
 * GET /cruelty-report
 * Optional query params:
 *  - animals_city or animal_city
 *  - animal_location or animal_locality
 */
const getAllReport = async (req, res) => {
  try {
    const {
      animals_city,
      animal_city,
      animal_location,
      animal_locality,
    } = req.query;

    const filter = {};

    const city = animals_city || animal_city;
    const location = animal_location || animal_locality;

    if (city) filter.animals_city = city;
    if (location) filter.animal_location = location;

    const reports = await CrueltyReport.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (err) {
    console.error('Get all cruelty reports error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch cruelty reports',
    });
  }
};

/**
 * GET /cruelty-report/:id
 */
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await CrueltyReport.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (err) {
    console.error('Get cruelty report by id error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch cruelty report',
    });
  }
};

/**
 * PATCH /cruelty-report/:id/status
 * Body: { status: "..." }
 * NOTE: Access control (admin only) should be enforced in auth middleware, not here.
 */
const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    const report = await CrueltyReport.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return updated doc
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Report status updated successfully',
      data: report,
    });
  } catch (err) {
    console.error('Update cruelty report status error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update report status',
    });
  }
};

/**
 * DELETE /cruelty-report/:id
 */
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await CrueltyReport.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Report deleted successfully',
    });
  } catch (err) {
    console.error('Delete cruelty report error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete cruelty report',
    });
  }
};

module.exports = {
  createReport,
  getAllReport,
  getReportById,
  updateReportStatus,
  deleteReport,
};
