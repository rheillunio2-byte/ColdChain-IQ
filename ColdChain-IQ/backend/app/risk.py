PRODUCT_BANDS = {
    "seafood": (0.0, 4.0), "dairy": (1.0, 5.0),
    "produce": (1.0, 4.0), "meat": (-2.0, 2.0),
}

def assess_risk(temperature_c: float, product_category: str = "seafood") -> dict:
    """Transparent demo score. Calibrate product bands with food-safety experts."""
    low, high = PRODUCT_BANDS.get(product_category.lower(), (0.0, 5.0))
    if low <= temperature_c <= high:
        score = 8
    else:
        distance = low - temperature_c if temperature_c < low else temperature_c - high
        score = min(100, 35 + round(distance * 18))
    level = "low" if score < 35 else "high" if score < 75 else "critical"
    return {"risk_score": score, "risk_level": level, "safe_range_c": [low, high]}
