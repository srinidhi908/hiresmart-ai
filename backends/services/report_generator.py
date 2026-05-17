from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib import colors
from reportlab.lib.styles import (
    getSampleStyleSheet,
    ParagraphStyle
)

from reportlab.lib.pagesizes import letter


def generate_pdf(results, company_name="HireSmart AI"):

    file_path = "HireSmart_Report.pdf"

    doc = SimpleDocTemplate(
        file_path,
        pagesize=letter
    )

    styles = getSampleStyleSheet()

    # =========================
    # 🎨 CUSTOM STYLES
    # =========================
    title_style = ParagraphStyle(
        name="Title",
        fontSize=22,
        alignment=1,
        textColor=colors.HexColor("#111827"),
        spaceAfter=12
    )

    subtitle_style = ParagraphStyle(
        name="Subtitle",
        fontSize=10,
        alignment=1,
        textColor=colors.HexColor("#6b7280"),
        spaceAfter=20
    )

    normal_style = ParagraphStyle(
        name="Normal",
        fontSize=10,
        textColor=colors.HexColor("#374151"),
        leading=16
    )

    # 🔥 TABLE TEXT STYLE
    table_text = ParagraphStyle(
        name="TableText",
        fontSize=9,
        leading=12,
        wordWrap="CJK"
    )

    elements = []

    # =========================
    # 🏢 HEADER SECTION
    # =========================
    elements.append(
        Paragraph(company_name, title_style)
    )

    elements.append(
        Paragraph(
            "Candidate Screening Report",
            subtitle_style
        )
    )

    # =========================
    # 🏆 SUMMARY TABLE
    # =========================
    table_data = [
        ["Rank", "Candidate", "Score", "Status"]
    ]

    for i, r in enumerate(results, start=1):

        table_data.append([
            str(i),

            Paragraph(
                r.get("name", "Unknown"),
                table_text
            ),

            f"{r.get('match_score', 0)}%",

            r.get("classification", "N/A")
        ])

    table = Table(
        table_data,
        colWidths=[40, 260, 70, 90]
    )

    table.setStyle(TableStyle([

        # HEADER
        (
            "BACKGROUND",
            (0, 0),
            (-1, 0),
            colors.HexColor("#111827")
        ),

        (
            "TEXTCOLOR",
            (0, 0),
            (-1, 0),
            colors.white
        ),

        (
            "FONTNAME",
            (0, 0),
            (-1, 0),
            "Helvetica-Bold"
        ),

        # BODY
        (
            "GRID",
            (0, 0),
            (-1, -1),
            0.25,
            colors.HexColor("#d1d5db")
        ),

        (
            "BACKGROUND",
            (0, 1),
            (-1, -1),
            colors.whitesmoke
        ),

    ]))

    elements.append(table)

    elements.append(Spacer(1, 25))

    # =========================
    # 📦 DETAILED CANDIDATE CARDS
    # =========================
    for i, item in enumerate(results, start=1):

        # =========================
        # 🏅 RANK BADGE
        # =========================
        if i == 1:

            badge = "🏆 Top Candidate"

        elif i == 2:

            badge = "🥈 Second Best"

        elif i == 3:

            badge = "🥉 Third Best"

        else:

            badge = f"Rank {i}"

        # =========================
        # 🎨 STATUS COLOR
        # =========================
        if item.get("classification") == "Suitable":

            status_color = "#16a34a"

        elif item.get("classification") == "Moderate":

            status_color = "#f59e0b"

        else:

            status_color = "#dc2626"

        # =========================
        # 🔥 PERSONAL DETAILS
        # =========================
        candidate_name = item.get(
            "candidate_name",
            "Not Found"
        )

        candidate_email = item.get(
            "candidate_email",
            "Not Found"
        )

        candidate_phone = item.get(
            "candidate_phone",
            "Not Found"
        )

        # =========================
        # 📄 CARD CONTENT
        # =========================
        content = f"""
        <b>{badge}</b><br/><br/>

        <b>Resume File:</b> {item.get('name', 'Unknown')}<br/><br/>

        <b>Candidate Name:</b> {candidate_name}<br/>
        <b>Email:</b> {candidate_email}<br/>
        <b>Phone:</b> {candidate_phone}<br/><br/>

        <b>Score:</b> {item.get('match_score', 0)}%<br/>

        <b>Status:</b>
        <font color="{status_color}">
        <b>{item.get('classification', 'N/A')}</b>
        </font><br/><br/>

        <b>Matched Skills:</b>
        {", ".join(item.get('matched_skills', [])) or "None"}<br/><br/>

        <b>Missing Skills:</b>
        {", ".join(item.get('missing_skills', [])) or "None"}
        """

        # =========================
        # 📦 CARD DESIGN
        # =========================
        card = Table(
            [[Paragraph(content, normal_style)]],
            colWidths=[500]
        )

        card.setStyle(TableStyle([

            (
                "BOX",
                (0, 0),
                (-1, -1),
                0.5,
                colors.HexColor("#e5e7eb")
            ),

            (
                "BACKGROUND",
                (0, 0),
                (-1, -1),
                colors.white
            ),

            (
                "PAD",
                (0, 0),
                (-1, -1),
                14
            ),

        ]))

        elements.append(card)

        elements.append(Spacer(1, 15))

    # =========================
    # 🚀 BUILD PDF
    # =========================
    doc.build(elements)

    return file_path