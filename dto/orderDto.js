function orderDto(body) {
  return (
    body.answer.map(
      ({
        order,
        activateTimestamp,
      }) => ({
        order,
        activateTimestamp,
      })
    )
  )
};

module.exports = orderDto;
