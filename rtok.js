function toupper(letter) {
    "use strict";
    return letter.toUpperCase(); // fix me
}

function rtok(ascii, mlif) {
    "use strict";
    var i = 0;
    var codepoint;

    mlif.getElementById("kana").innerHTML = "";
    while (i < ascii.length) {
        codepoint = a_to_kana(ascii.substring(i));
        switch (codepoint) {
        case HIRA_A:
        case HIRA_I:
        case HIRA_U:
        case HIRA_E:
        case HIRA_O:
        case HIRA_N:
        case KATA_A:
        default:
            if (codepoint == 0) {
                mlif.getElementById("kana").innerHTML += ascii[i];
                i += 1;
            } else {
                mlif.getElementById("kana").innerHTML += "&#" + codepoint + ";";
                i += ascii_in;
            }
        }
    }
    return;
}

var ascii_in = 0;
function a_to_kana(syllable) {
    "use strict";
    ascii_in = 0;
    if (syllable == null) {
        return null;
    }

    ascii_in = 1;
    switch (syllable[0]) {
    case '.':  return 0x3002;
    case ',':  return 0x3001;

    case 'a':  return HIRA_A;
    case 'i':  return HIRA_I;
    case 'u':  return HIRA_U;
    case 'e':  return HIRA_E;
    case 'o':  return HIRA_O; /* We'll have to handle "wo" externally.... */
    case 'n':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_NA;
        case 'i':  return HIRA_NI;
        case 'u':  return HIRA_NU;
        case 'e':  return HIRA_NE;
        case 'o':  return HIRA_NO;
        }
        ascii_in = 1;
        return HIRA_N;

/*
 * I feel it best to reserve capitalized romaji syllables to refer to
 * katakana.  We need a way to tell apart user requests to print hiragana
 * letters and requests to print katakana ones.
 *
 * Since English grammar needs proper nouns (i.e. names, places and other
 * entities not internalized to the Japanese language) to be capitalized,
 * we can assume that capitalized proper nouns in English may have some
 * context preserved in romaji by starting the romaji with capital letters.
 */
    case 'A':  return KATA_A;
    case 'I':  return KATA_I;
    case 'U':  return KATA_U;
    case 'E':  return KATA_E;
    case 'O':  return KATA_O;
    case 'N':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_NA;
        case 'I':  return KATA_NI;
        case 'U':  return KATA_NU;
        case 'E':  return KATA_NE;
        case 'O':  return KATA_NO;
        }
        ascii_in = 1;
        return KATA_N;
    case ' ': /* spacing to separate "o" as the old "wo" particle */
        ascii_in = 2;
        switch (syllable[1]) {
        case 'o':
            if (syllable[2] != ' ')
                break;
            return HIRA_W_O; /* w-line "o" (legacy:  "wo") */
        case 'O':
            if (syllable[2] != ' ')
                break;
            return KATA_W_O;
        }
        ascii_in = 1;
        return (" ");

/*
 * Try to get most of the katakana-specific syllables out of the way.
 * These sounds are not native Japanese and do not exist in hiragana.
 */
    case 'D':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_DI;
        case 'Y':
            ascii_in = 3;
            return (toupper(syllable[2]) == 'U' ? KATA_DYU : 0);
        case 'U':  return 0;

    /* The rest of these all exist as native sounds also in hiragana. */
        case 'A':  return KATA_DA;
        case 'E':  return KATA_DE;
        case 'O':  return KATA_DO;
        }
        return ERR_BROKEN_ROMAJI;
    case 'F':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_FA;
        case 'I':  return KATA_FI;
        case 'E':  return KATA_FE;
        case 'O':  return KATA_FO;

        case 'Y':
            ascii_in = 3;
            return (toupper(syllable[2]) == 'U' ? KATA_FYU : 0);
        case 'U':  return KATA_FU; /* DOES exist in hiragana ("hu") */
        }
        return ERR_BROKEN_ROMAJI;
    case 'T':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_TI;
        case 'S':
            ascii_in = 3;
            switch (toupper(syllable[2])) {
            case 'A':  return KATA_TSA;
            case 'I':  return KATA_TSI;
            case 'E':  return KATA_TSE;
            case 'O':  return KATA_TSO;

            case 'U':  return KATA_TSU; /* DOES exist in hiragana */
            default:  return 0;
            }

    /* The rest of these all exist as native sounds also in hiragana. */
        case 'A':  return KATA_TA;
        case 'E':  return KATA_TE;
        case 'O':  return KATA_TO;
        case 'U':  return 0;
        }
        return 0;
    case 'V':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'U':  return KATA_VU; /* Native Japanese speakers use "BU" */
        case 'A':  return KATA_VA;
        case 'I':  return KATA_VI;
        case 'E':  return KATA_VE;
        case 'O':  return KATA_VO;
        }
        return 0;
    case 'W':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_WI;
        case 'E':  return KATA_WE;
        case 'O':  return KATA_WO;

        case 'A':  return KATA_WA; /* DOES exist in hiragana */
        case 'U':  return 0;
        }
        return 0;

/*
 * PHEW!  Now let's focus on only the hiragana, natively present subset of
 * sounds actually present in the Japanese language.
 */
    case 'd':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_DA;
        case 'i':  return 0;
        case 'u':  return 0;
        case 'e':  return HIRA_DE;
        case 'o':  return HIRA_DO;
        }
        return 0;
    case 'f':
        ascii_in = 2;
        return (syllable[1] == 'u' ? HIRA_FU : 0);
    case 't':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_TA;
        case 's':
            ascii_in = 3;
            return (syllable[2] == 'u' ? HIRA_TSU : 0);
        case 'e':  return HIRA_TE;
        case 'o':  return HIRA_TO;
        }
        return 0;
    case 'w':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_WA;
        case 'i':  return HIRA_WI;
        case 'u':  return 0;
        case 'e':  return HIRA_WE;
        case 'o':  return HIRA_W_O; /* deprecated; use " o " with spaces */
        }
        return 0;

/*
 * Now that just leaves the rows that share the same presence of syllables
 * in both katakana and hiragana together, making the rest of this function
 * simple to implement (except for that fucking 'N' sound maybe... to do).
 */
    case 'k':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_KA;
        case 'i':  return HIRA_KI;
        case 'u':  return HIRA_KU;
        case 'e':  return HIRA_KE;
        case 'o':  return HIRA_KO;
        }
        return 0;
    case 'K':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_KA;
        case 'I':  return KATA_KI;
        case 'U':  return KATA_KU;
        case 'E':  return KATA_KE;
        case 'O':  return KATA_KO;
        }
        return 0;

    case 's':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_SA;
        case 'h':
            ascii_in = 3;
            return (syllable[2] == 'i' ? HIRA_SHI : 0);
        case 'i':  return ERR_LOST_SYLLABLE;
        case 'u':  return HIRA_SU;
        case 'e':  return HIRA_SE;
        case 'o':  return HIRA_SO;
        }
        return 0;

    case 'h':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_HA;
        case 'i':  return HIRA_HI;
        case 'u':  return HIRA_HU;
        case 'e':  return HIRA_HE;
        case 'o':  return HIRA_HO;
        }
        return 0;
    case 'H':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_HA;
        case 'I':  return KATA_HI;
        case 'U':  return KATA_HU;
        case 'E':  return KATA_HE;
        case 'O':  return KATA_HO;
        }
        return 0;

    case 'm':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_MA;
        case 'i':  return HIRA_MI;
        case 'u':  return HIRA_MU;
        case 'e':  return HIRA_ME;
        case 'o':  return HIRA_MO;
        }
        return 0;
    case 'M':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_MA;
        case 'I':  return KATA_MI;
        case 'U':  return KATA_MU;
        case 'E':  return KATA_ME;
        case 'O':  return KATA_MO;
        }
        return 0;

    case 'r':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_RA;
        case 'i':  return HIRA_RI;
        case 'u':  return HIRA_RU;
        case 'e':  return HIRA_RE;
        case 'o':  return HIRA_RO;
        }
        return 0;
    case 'R':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_RA;
        case 'I':  return KATA_RI;
        case 'U':  return KATA_RU;
        case 'E':  return KATA_RE;
        case 'O':  return KATA_RO;
        }
        return 0;

    case 'y':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_YA;
        case 'i':  return HIRA_YI;
        case 'u':  return HIRA_YU;
        case 'e':  return HIRA_YE;
        case 'o':  return HIRA_YO;
        }
        return 0;
    case 'Y':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_YA;
        case 'I':  return KATA_YI;
        case 'U':  return KATA_YU;
        case 'E':  return KATA_YE;
        case 'O':  return KATA_YO;
        }
        return 0;

    case 'g':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_GA;
        case 'i':  return HIRA_GI;
        case 'u':  return HIRA_GU;
        case 'e':  return HIRA_GE;
        case 'o':  return HIRA_GO;
        }
        return 0;
    case 'G':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_GA;
        case 'I':  return KATA_GI;
        case 'U':  return KATA_GU;
        case 'E':  return KATA_GE;
        case 'O':  return KATA_GO;
        }
        return 0;

    case 'b':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_BA;
        case 'i':  return HIRA_BI;
        case 'u':  return HIRA_BU;
        case 'e':  return HIRA_BE;
        case 'o':  return HIRA_BO;
        }
        return 0;
    case 'B':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_BA;
        case 'I':  return KATA_BI;
        case 'U':  return KATA_BU;
        case 'E':  return KATA_BE;
        case 'O':  return KATA_BO;
        }
        return 0;

    case 'p':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_PA;
        case 'i':  return HIRA_PI;
        case 'u':  return HIRA_PU;
        case 'e':  return HIRA_PE;
        case 'o':  return HIRA_PO;
        }
        return 0;
    case 'P':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_PA;
        case 'I':  return KATA_PI;
        case 'U':  return KATA_PU;
        case 'E':  return KATA_PE;
        case 'O':  return KATA_PO;
        }
        return 0;
    }
    return 0;
}
