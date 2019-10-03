#include <stdio.h>
#include <stdlib.h>

#include <ctype.h>
#include <string.h>

extern int is_vowel(char letter);
extern int is_consonant(char letter);

extern unsigned short a_to_hiragana(const char* syllable);
extern unsigned short a_to_katakana(const char* syllable);
extern unsigned short atokana(const char* syllable);

int
is_vowel(char letter)
{
    switch (tolower(letter)) {
    case 'a':
    case 'e':
    case 'i':
    case 'o':
    case 'u':
        return 1;

    case 'y':
    case 'n':
    default:
        return 0;
    }
}
int
is_consonant(char letter)
{
    switch (tolower(letter)) {
    case 'b':
    case 'c':
    case 'd':
    case 'f':
    case 'g':
    case 'h':
    case 'j':
    case 'k':
    case 'l':
    case 'm':
    case 'n':
    case 'p':
    case 'q':
    case 'r':
    case 's':
    case 't':
    case 'v':
    case 'w':
    case 'x':
    case 'y':
    case 'z':
        return 1;
    default:
        return 0;
    }
}

#include <limits.h>
static char vowel_offsets[CHAR_MAX];
/* for converting a/i/u/e/o to integer offsets +0 to +4 */

int
main(int argc, char* argv[])
{
    char* romaji;
    char* kana_HTML;
    register size_t i, j;

    vowel_offsets['A'] = vowel_offsets['a'] = 0;
    vowel_offsets['I'] = vowel_offsets['i'] = 1;
    vowel_offsets['U'] = vowel_offsets['u'] = 2;
    vowel_offsets['E'] = vowel_offsets['e'] = 3;
    vowel_offsets['O'] = vowel_offsets['o'] = 4;

    if (argc < 2) {
        fputs("Not yet implemented:  Run-time input scan.\n", stderr);
        return 1;
    }

    romaji = argv[1];
    kana_HTML = malloc(strlen(romaji) * sizeof("&#x0000;"));
    if (kana_HTML == NULL) {
        fputs("Insufficient memory to allocate kana output.\n", stderr);
        return 1;
    }

    kana_HTML[0] = '\0';
    for (i = 0; i < strlen(romaji); i++) {
        static char syllable[4];

        for (j = 0; j < sizeof(syllable); j++) {
            syllable[j] = '\0';
        }
        for (j = 0; j < sizeof(syllable); j++) {
            syllable[j] = romaji[i];
            if (is_vowel(syllable[j] || !isalpha(syllable[j])))
                break;
            ++i;
        }
        sprintf(&kana_HTML[strlen(kana_HTML)], "&#x%04X", atokana(syllable));
    }
}

unsigned short atokana(const char* syllable)
{
    if (syllable == NULL)
        return 0x0000;
    if (syllable[0] >= 'A' && syllable[0] <= 'Z')
        return a_to_katakana(syllable); /* Assume capital letters for proper nouns. */
    if (syllable[0] >= 'a' && syllable[0] <= 'z')
        return a_to_hiragana(syllable); /* Regular common words in lowercase Romaji. */
    return 0x0000;
}

unsigned short a_to_hiragana(const char* syllable)
{
    register unsigned short ret_slot;
    const char row_type = tolower(syllable[0]);
    const char sub_type = tolower(syllable[1]);

    if (syllable[0] == '\0')
        return 0x0000; /* no syllable, no translation... */

    if (syllable[1] == '\0') {
        switch (row_type) {
        case 'a':  return 0x3042;
        case 'i':  return 0x3044;
        case 'u':  return 0x3046;
        case 'e':  return 0x3048;
        case 'o':  return 0x304A;

        case 'n':  return 0x3093;
        default:
            return (is_consonant(row_type)
              ? 0x3063 /* small "tsu" for double consonants */
              : 0x0000 /* probably just garbage, like '.' or ' ' */
            );
        }
    }

    if (syllable[2] == '\0') {
        switch (row_type) {
        case 'k':  return (0x304B + 2*vowel_offsets[sub_type]);
        case 's':  return (0x3055 + 2*vowel_offsets[sub_type]);
        case 't':
            ret_slot = 0x305F + 2*vowel_offsets[sub_type];
            ret_slot += (ret_slot >= 0x3063) ? 1 : 0; /* fucking small "tsu" */
            return (ret_slot);
        case 'n':  return (0x306A + 1*vowel_offsets[sub_type]);
        case 'h':  return (0x306F + 3*vowel_offsets[sub_type]);
        case 'm':  return (0x307E + 1*vowel_offsets[sub_type]);
        case 'y':
            switch (sub_type) {
            case 'a':  return 0x3084;
            case 'u':  return 0x3086;
            case 'o':  return 0x3088;
            case 'i':
            case 'e':
            default:
                return 0x0000;
            }
        case 'r':  return (0x3089 + 1*vowel_offsets[sub_type]);
        case 'w':
            switch (sub_type) {
                case 'a':  return 0x308F;
                case 'o':  return 0x3092;
                case 'i': /* deprecated since World War II */
                    return 0x3090;
                case 'e': /* deprecated since World War II */
                    return 0x3091;
                case 'u':
                default:
                    return 0x0000;
            }
        case 'g':  return (0x304C + 2*vowel_offsets[sub_type]);
        case 'z':  return (0x3056 + 2*vowel_offsets[sub_type]);
        case 'd':
            ret_slot = 0x3060 + 2*vowel_offsets[sub_type];
            ret_slot += (ret_slot >= 0x3063) ? 1 : 0;
            return (ret_slot);
        case 'b':  return (0x3070 + 3*vowel_offsets[sub_type]);
        case 'p':  return (0x3071 + 3*vowel_offsets[sub_type]);

        case 'j':
            puts("Not yet implemented.");
            return ((0x0003u << 14) | 0x3058u);
        default:
            return 0x0000;
        }
    }

    switch (tolower(syllable[2])) {
        case 'a':
        case 'u':
        case 'o':
            puts("Not yet implemented.");
            return (0x0003u << 14);
        default:
            return 0x0000;
    }
}

unsigned short a_to_katakana(const char* syllable)
{
    /* Fuck repeating all that; just add the Unicode distance offset. */
    return (a_to_hiragana(syllable) + 0x0060u);
}
