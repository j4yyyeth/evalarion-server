const test_one = async (req, res, next) => {
  try {
    const testData = "Test Data";
    res.json(testData);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
    test_one,
};
