function archivateCommodilityDto(body) {
  return (
    body.answer.map(
      ({
        entity,
        complexQualityBoost,
        lotTime,
        warrantyObligations,
        paymentTerms,
        lotCost,
        action,
      }) => ({
        entity,
        complexQualityBoost,
        lotTime,
        warrantyObligations,
        paymentTerms,
        lotCost,
        action,
      })
    )
  )
};

module.exports = archivateCommodilityDto;
