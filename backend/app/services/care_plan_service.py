"""
Care plan generation service - Business logic for creating care plans.
Constructs prompts, calls Claude API, and formats output.
"""
from datetime import datetime
from app.models import PatientInput, CarePlanOutput
from app.services.claude_client import claude_client
from app.utils.logger import setup_logger
from app.config import settings

logger = setup_logger(__name__, settings.log_level)

# System prompt for Claude - defines the role and output format
SYSTEM_PROMPT = """You are an expert nursing care plan generator for skilled nursing facilities.
You have extensive experience with NANDA nursing diagnoses, evidence-based interventions, and comprehensive care planning.

Your task is to generate a complete, professional care plan based on patient data provided.

Output Requirements:
- Use proper medical terminology
- Include NANDA nursing diagnoses where applicable
- Provide specific, actionable interventions with frequencies
- Consider all patient risk factors
- Format output as clean, professional HTML suitable for display and printing
- Be comprehensive but concise
- Ensure all recommendations are evidence-based and realistic for skilled nursing facility settings"""

# User prompt template
USER_PROMPT_TEMPLATE = """Generate a comprehensive nursing care plan for the following patient:

PATIENT INFORMATION:
- Name: {name}
- Age: {age} years old
- Gender: {gender}
- Admission Date: {admission_date}
- Facility: {facility}

MEDICAL HISTORY:
- Primary Diagnosis: {primary_diagnosis}
- Comorbidities: {comorbidities}

CURRENT VITALS:
- Blood Pressure: {blood_pressure}
- Heart Rate: {heart_rate} bpm
- Temperature: {temperature}°F
- Oxygen Saturation: {oxygen_saturation}%
- Pain Level: {pain_level}/10

CURRENT MEDICATIONS:
{medications}

ALLERGIES:
{allergies}

CLINICAL STATUS:
- Current Symptoms: {symptoms}
- Mobility Level: {mobility_level}
- ADL Independence: {adl_independence}
- Fall Risk Factors: {fall_risk_factors}
- Cognitive Status: {cognitive_status}

SPECIAL CONSIDERATIONS:
- Isolation Precautions: {isolation_precautions}
- Diet Restrictions: {diet_restrictions}

Generate a structured care plan with the following sections in HTML format:

1. **Patient Summary** - Brief overview of patient status
2. **Nursing Diagnoses** - 3-5 priority nursing diagnoses (use NANDA format when appropriate)
3. **Goals**:
   - Short-term goals (achievable within 1 week)
   - Long-term goals (achievable by discharge)
4. **Interventions** - Specific interventions with frequency, organized by:
   - Medication administration
   - Vital signs monitoring
   - Mobility/positioning
   - Wound care (if applicable)
   - Nutrition/hydration
   - Safety measures
5. **Risk Assessments**:
   - Fall risk score and precautions
   - Pressure injury risk
   - Infection risk
6. **Monitoring Schedule** - What to check and how often
7. **Discharge Planning** - Considerations for discharge readiness
8. **Special Precautions** - Any specific safety or care precautions
9. **Family Education** - Key points to educate family/caregivers

Format the output as clean, professional HTML with appropriate headings (<h2>, <h3>), lists (<ul>, <ol>), and styling that works well for both screen display and printing. Use a medical-professional aesthetic."""


def format_medications(medications: list) -> str:
    """Format medication list for prompt."""
    if not medications:
        return "None documented"
    return "\n".join(
        f"  - {med.name}: {med.dosage} {med.frequency}" for med in medications
    )


def format_list(items: list) -> str:
    """Format a list of items for prompt."""
    if not items:
        return "None documented"
    return ", ".join(items)


async def generate_care_plan(patient: PatientInput) -> CarePlanOutput:
    """
    Generate a comprehensive care plan for a patient using Claude AI.

    Args:
        patient: Patient input data

    Returns:
        CarePlanOutput with generated HTML care plan

    Raises:
        Exception: If care plan generation fails
    """
    try:
        logger.info(f"Generating care plan for patient: {patient.name}")

        # Format the user prompt with patient data
        user_prompt = USER_PROMPT_TEMPLATE.format(
            name=patient.name,
            age=patient.age,
            gender=patient.gender,
            admission_date=patient.admission_date.strftime("%Y-%m-%d"),
            facility=patient.facility,
            primary_diagnosis=patient.primary_diagnosis,
            comorbidities=format_list(patient.comorbidities),
            blood_pressure=patient.blood_pressure,
            heart_rate=patient.heart_rate,
            temperature=patient.temperature,
            oxygen_saturation=patient.oxygen_saturation,
            pain_level=patient.pain_level,
            medications=format_medications(patient.current_medications),
            allergies=format_list(patient.allergies),
            symptoms=format_list(patient.symptoms),
            mobility_level=patient.mobility_level,
            adl_independence=patient.adl_independence,
            fall_risk_factors=format_list(patient.fall_risk_factors),
            cognitive_status=patient.cognitive_status,
            isolation_precautions=patient.isolation_precautions or "None",
            diet_restrictions=patient.diet_restrictions or "None",
        )

        # Generate care plan using Claude API
        care_plan_html = await claude_client.generate_completion(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            max_tokens=4000,
        )

        logger.info(f"Care plan generated successfully for: {patient.name}")

        # Wrap in a container div with print-friendly styling
        styled_html = f"""
        <div class="care-plan-container" style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
            <style>
                @media print {{
                    .care-plan-container {{
                        max-width: 100%;
                        padding: 10px;
                    }}
                    button {{
                        display: none !important;
                    }}
                }}
                .care-plan-container h1 {{
                    color: #2563eb;
                    border-bottom: 3px solid #2563eb;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }}
                .care-plan-container h2 {{
                    color: #1e40af;
                    margin-top: 25px;
                    margin-bottom: 15px;
                }}
                .care-plan-container h3 {{
                    color: #1e3a8a;
                    margin-top: 20px;
                    margin-bottom: 10px;
                }}
                .care-plan-container ul, .care-plan-container ol {{
                    line-height: 1.8;
                    margin: 10px 0;
                }}
                .care-plan-container li {{
                    margin-bottom: 8px;
                }}
                .care-plan-container strong {{
                    color: #1e40af;
                }}
            </style>
            {care_plan_html}
        </div>
        """

        return CarePlanOutput(
            patient_name=patient.name,
            care_plan_html=styled_html,
            generated_at=datetime.utcnow().isoformat() + "Z",
        )

    except Exception as e:
        logger.error(f"Failed to generate care plan: {str(e)}")
        raise
