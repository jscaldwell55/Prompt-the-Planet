const { Prompt } = require('../models');

exports.searchPrompts = async (req, res) => {
  try {
    const { query, tags } = req.query;
    
    let searchQuery = {};
    
    // Text search if query exists
    if (query) {
      searchQuery = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } }
        ]
      };
    }
    
    // Filter by tags if provided
    if (tags) {
      const tagArray = tags.split(',');
      searchQuery.tags = { $in: tagArray };
    }
    
    const prompts = await Prompt.find(searchQuery)
      .sort({ createdAt: -1 })
      .populate('user', 'name avatar');
    
    res.json(prompts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};