class ProfileAdapter:
    """
    Adapts Profile DB object/dict into a structure
    expected by all scoring engines.
    """

    def __init__(self, profile: dict):
        # ---------- COMMON ----------
        monthly_budget = profile.get("monthlyBudget", profile.get("monthly_budget", 15000))
        family_size = profile.get("familySize", profile.get("family_size", 1))

        self.max_monthly_premium = monthly_budget
        self.monthly_premium_budget = monthly_budget

        self.annual_income = monthly_budget * 12 * 3
        self.number_of_dependents = max(family_size - 1, 0)
        self.total_liabilities = 0

        self.goal = profile.get("goal", "Family Protection")
        self.risk_level = profile.get("riskLevel", profile.get("risk_level", "Medium"))

        # ---------- HEALTH ----------
        self.cover_amount = 500000 * family_size
        self.has_pre_existing_conditions = False
        self.maternity_required = family_size > 2
        self.room_preference = "private"
        self.deductible_preference = None
        self.co_pay_acceptable = True

        # ---------- LIFE ----------
        self.preferred_policy_term = 20
        self.critical_illness = self.goal == "Family Protection"

        # ---------- MOTOR ----------
        self.preferred_coverage_type = "comprehensive"
        self.idv_preference = "recommended"
        self.claim_last_year = False

        # ---------- HOME ----------
        self.property_age = 10
        self.builtup_area = 1000
        self.need_structure = True
        self.need_contents = True
        self.need_valuables = False
        self.need_electronics = True
        self.need_rent_loss = False
        self.has_security = False
        self.ownership_type = "owned"

        # ---------- FIRE ----------
        self.property_type = "residential"
        self.occupancy_type = "residential"
        self.construction_type = "rcc"

        self.fire = True
        self.explosion = False
        self.lightning = False
        self.natural_disaster = False
        self.burglary = False
        self.electronic_equipment = True

        self.stock_value = 500000
        self.machinery_value = 300000
        self.total_sum_insured = 800000

        # ---------- BUSINESS ----------
        self.business_type = "retail"
        self.business_size = "small"
        self.ownership_type = "sole"
        self.risk_intensity = "medium"

        self.annual_revenue = 1500000
        self.total_asset_value = 1000000

        self.property_damage_required = True
        self.fire_cover_required = True
        self.machinery_breakdown_required = False
        self.theft_burglary_required = False
        self.liability_cover_required = True
        self.employee_safety_required = False
        self.cyber_insurance_required = False
        self.business_interruption_required = False
        self.existing_insurance = False

        # ---------- TRAVEL ----------
        self.medical_cover_required = True
        self.trip_cancellation_required = True
        self.baggage_cover_required = True
        self.adventure_sports = False
        self.coverage_amount_preference = "medium"
        self.oldest_traveler_age = 35
