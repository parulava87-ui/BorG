// --- ჩინური კალენდრის მონაცემები ---
// 0 = გოგო, 1 = ბიჭი. გასაღები არის ასაკი (18-45)
const chineseChart = {
    18: [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    19: [1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    20: [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    21: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    22: [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    23: [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
    24: [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    25: [0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    26: [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    27: [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    28: [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    29: [0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    30: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    31: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    32: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    33: [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    34: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    35: [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
    36: [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
    37: [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    38: [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    39: [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    40: [0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    41: [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    42: [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
    43: [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
    44: [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0],
    45: [0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1]
};

function calculateGender() {
    // მნიშვნელობების წამოღება
    const momDateStr = document.getElementById('momDob').value;
    const dadDateStr = document.getElementById('dadDob').value;
    const conceptionDateStr = document.getElementById('conceptionDate').value;

    // ვალიდაცია
    if (!momDateStr || !dadDateStr || !conceptionDateStr) {
        alert("გთხოვთ, შეავსოთ ყველა ველი!");
        return;
    }

    const momDate = new Date(momDateStr);
    const dadDate = new Date(dadDateStr);
    const conceptionDate = new Date(conceptionDateStr);

    // --- 1. სისხლის მეთოდის ლოგიკა ---
    let bloodText = "";
    let bloodClass = "";

    let dadAge = conceptionDate.getFullYear() - dadDate.getFullYear();
    let momAge = conceptionDate.getFullYear() - momDate.getFullYear();

    if (conceptionDate < new Date(conceptionDate.getFullYear(), dadDate.getMonth(), dadDate.getDate())) dadAge--;
    if (conceptionDate < new Date(conceptionDate.getFullYear(), momDate.getMonth(), momDate.getDate())) momAge--;

    const dadRemainder = dadAge % 4;
    const momRemainder = momAge % 3;

    if (dadRemainder < momRemainder) {
        bloodText = "ბიჭი (მამის სისხლი ახალია)";
        bloodClass = "boy";
    } else if (momRemainder < dadRemainder) {
        bloodText = "გოგო (დედის სისხლი ახალია)";
        bloodClass = "girl";
    } else {
        bloodText = "შანსი 50/50 (ან ტყუპები)";
        bloodClass = "unknown";
    }

    // --- 2. ჩინური კალენდრის ლოგიკა ---
    let chineseText = "";
    let chineseClass = "";

    let lunarAge = momAge + 1;
    let conceptionMonth = conceptionDate.getMonth();

    if (lunarAge < 18 || lunarAge > 45) {
        chineseText = "მონაცემი ვერ მოიძებნა (ასაკი 18-45)";
        chineseClass = "unknown";
    } else {
        const result = chineseChart[lunarAge][conceptionMonth];
        if (result === 1) {
            chineseText = "ბიჭი";
            chineseClass = "boy";
        } else {
            chineseText = "გოგო";
            chineseClass = "girl";
        }
    }

    // --- შედეგის გამოტანა ---
    const resultBox = document.getElementById('resultBox');
    const bloodCard = document.getElementById('bloodCard');
    const chineseCard = document.getElementById('chineseCard');

    document.getElementById('bloodResult').innerText = bloodText;
    bloodCard.className = "method-card " + bloodClass;

    document.getElementById('chineseResult').innerText = chineseText + ` (ასაკი: ${lunarAge}, თვე: ${conceptionMonth + 1})`;
    chineseCard.className = "method-card " + chineseClass;

    resultBox.style.display = "block";
}