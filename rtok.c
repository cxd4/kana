#include <ctype.h>
#include <stdio.h>

#include "putchar.h"

unsigned short
a_to_kana(const char* syllable)
{
    if (syllable == NULL) {
        fputs(
            "Caught translation attempt from null pointer.\n",
            stderr
        );
        return ERR_NULL_PTR_INPUT;
    }

    switch (syllable[0]) {
    case 'a':  return HIRA_A;
    case 'i':  return HIRA_I;
    case 'u':  return HIRA_U;
    case 'e':  return HIRA_E;
    case 'o':  return HIRA_O; /* We'll have to handle "wo" externally.... */

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
    case ' ': /* spacing to separate "o" as the old "wo" particle */
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
        return ERR_BROKEN_ROMAJI;

/*
 * Try to get most of the katakana-specific syllables out of the way.
 * These sounds are not native Japanese and do not exist in hiragana.
 */
    case 'D':
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_DI;
        case 'Y':
            return (toupper(syllable[2]) == 'U' ? KATA_DYU : ERR_BROKEN_ROMAJI);
	case 'U':  return ERR_LOST_SYLLABLE;

    /* The rest of these all exist as native sounds also in hiragana. */
        case 'A':  return KATA_DA;
        case 'E':  return KATA_DE;
        case 'O':  return KATA_DO;
        }
        return ERR_BROKEN_ROMAJI;
    case 'F':
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_FA;
        case 'I':  return KATA_FI;
        case 'E':  return KATA_FE;
        case 'O':  return KATA_FO;

        case 'Y':
            return (toupper(syllable[2]) == 'U' ? KATA_FYU : ERR_BROKEN_ROMAJI);
        case 'U':  return KATA_FU; /* DOES exist in hiragana ("hu") */
        }
        return ERR_BROKEN_ROMAJI;
    case 'T':
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_TI;
        case 'S':
            switch (toupper(syllable[2])) {
            case 'A':  return KATA_TSA;
            case 'I':  return KATA_TSI;
            case 'E':  return KATA_TSE;
            case 'O':  return KATA_TSO;

            case 'U':  return KATA_TSU; /* DOES exist in hiragana */
            default:  ERR_BROKEN_ROMAJI;
            }

    /* The rest of these all exist as native sounds also in hiragana. */
        case 'A':  return KATA_TA;
        case 'E':  return KATA_TE;
        case 'O':  return KATA_TO;
        case 'U':  return ERR_LOST_SYLLABLE;
        }
        return ERR_BROKEN_ROMAJI;
    case 'V':
        switch (toupper(syllable[1])) {
        case 'U':  return KATA_VU; /* Native Japanese speakers use "BU" */
        case 'A':  return KATA_VA;
        case 'I':  return KATA_VI;
        case 'E':  return KATA_VE;
        case 'O':  return KATA_VO;
        }
        return ERR_BROKEN_ROMAJI;
    case 'W':
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_WI;
        case 'E':  return KATA_WE;
        case 'O':  return KATA_WO;

        case 'A':  return KATA_WA; /* DOES exist in hiragana */
        case 'U':  return ERR_LOST_SYLLABLE;
        }
        return ERR_BROKEN_ROMAJI;

/*
 * PHEW!  Now let's focus on only the hiragana, natively present subset of
 * sounds actually present in the Japanese language.
 */
    case 'd':
        switch (syllable[1]) {
        case 'a':  return HIRA_DA;
        case 'i':  return ERR_LOST_SYLLABLE;
        case 'u':  return ERR_LOST_SYLLABLE;
        case 'e':  return HIRA_DE;
        case 'o':  return HIRA_DO;
        }
        return ERR_BROKEN_ROMAJI;
    case 'f':
        return (syllable[1] == 'u' ? HIRA_FU : ERR_BROKEN_ROMAJI);
    case 't':
        switch (syllable[1]) {
        case 'a':  return HIRA_TA;
        case 's':  return (syllable[2] == 'u' ? HIRA_TSU : ERR_BROKEN_ROMAJI);
        case 'e':  return HIRA_TE;
        case 'o':  return HIRA_TO;
        }
        return ERR_BROKEN_ROMAJI;
    case 'w':
        switch (syllable[1]) {
        case 'a':  return HIRA_WA;
        case 'i':  return ERR_LOST_SYLLABLE;
        case 'u':  return ERR_LOST_SYLLABLE;
        case 'e':  return ERR_LOST_SYLLABLE;
        case 'o':  return HIRA_W_O; /* deprecated; use " o " with spaces */
        }
        return ERR_BROKEN_ROMAJI;

/*
 * Now that just leaves the rows that share the same presence of syllables
 * in both katakana and hiragana together, making the rest of this function
 * simple to implement (except for that fucking 'N' sound maybe... to do).
 */
    }
    return ERR_BROKEN_ROMAJI;
}
