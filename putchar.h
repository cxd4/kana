#ifndef _PUTCHAR_H_
#define _PUTCHAR_H_

#define NOTBLANK(character)     ((character) != ' ' ? 0x01u : 0x00u)

/*
 * helper macro to store binary octets from source code ASCII strings of
 * text showing the stroke order to each kana
 *
 * e.g. SB("  1 2 3 ") == 0x2A
 * used to store given strings as a table of bits
 */
#define SB(s) (\
(NOTBLANK((s)[0]) << 7) | \
(NOTBLANK((s)[1]) << 6) | \
(NOTBLANK((s)[2]) << 5) | \
(NOTBLANK((s)[3]) << 4) | \
(NOTBLANK((s)[4]) << 3) | \
(NOTBLANK((s)[5]) << 2) | \
(NOTBLANK((s)[6]) << 1) | \
(NOTBLANK((s)[7]) << 0)\
)

extern unsigned char kfont8[][8];

/*
 * initialization functions to queue ASCII art drawings into the buffer
 *
 * To emphasize stroke order, I try to use different characters for the
 * "pixels" that compose different strokes in each kana glyph.
 */
extern void hira8x8(void);

extern void kputc8(unsigned int code_point);

extern unsigned short a_to_kana(const char* syllable);

enum {
    HIRA_A,   HIRA_I,   HIRA_U,   HIRA_E,   HIRA_O,
    HIRA_KA,  HIRA_KI,  HIRA_KU,  HIRA_KE,  HIRA_KO,
    HIRA_SA,  HIRA_SHI, HIRA_SU,  HIRA_SE,  HIRA_SO,
    HIRA_TA,  HIRA_CHI, HIRA_TSU, HIRA_TE,  HIRA_TO,
    HIRA_NA,  HIRA_NI,  HIRA_NU,  HIRA_NE,  HIRA_NO,
    HIRA_HA,  HIRA_HI,  HIRA_FU,  HIRA_HE,  HIRA_HO,
    HIRA_MA,  HIRA_MI,  HIRA_MU,  HIRA_ME,  HIRA_MO,
    HIRA_YA,            HIRA_YU,            HIRA_YO,
    HIRA_RA,  HIRA_RI,  HIRA_RU,  HIRA_RE,  HIRA_RO,
    HIRA_ya,            HIRA_yu,            HIRA_yo,

    HIRA_DA,  HIRA_JI,  HIRA_ZU,  HIRA_DE,  HIRA_DO,
    HIRA_WA,                                HIRA_W_O,

    KATA_A,   KATA_I,   KATA_U,   KATA_E,   KATA_O,
    KATA_KA,  KATA_KI,  KATA_KU,  KATA_KE,  KATA_KO,
    KATA_SA,  KATA_SHI, KATA_SU,  KATA_SE,  KATA_SO,
    KATA_TA,  KATA_CHI, KATA_TSU, KATA_TE,  KATA_TO,
    KATA_NA,  KATA_NI,  KATA_NU,  KATA_NE,  KATA_NO,
    KATA_HA,  KATA_HI,  KATA_FU,  KATA_HE,  KATA_HO,
    KATA_MA,  KATA_MI,  KATA_MU,  KATA_ME,  KATA_MO,
    KATA_YA,            KATA_YU,            KATA_YO,
    KATA_RA,  KATA_RI,  KATA_RU,  KATA_RE,  KATA_RO,

    KATA_DA,  KATA_JI,  KATA_ZU,  KATA_DE,  KATA_DO,
    KATA_WA,                                KATA_W_O,

              KATA_WI,            KATA_WE,  KATA_WO,
    KATA_TSA, KATA_TSI,           KATA_TSE, KATA_TSO,
              KATA_TI,
    KATA_FA,  KATA_FI,  KATA_FYU, KATA_FE,  KATA_FO,
              KATA_DI,  KATA_DYU,
    KATA_VA,  KATA_VI,  KATA_VU,  KATA_VE,  KATA_VO,

    NUMBER_OF_KANA_LETTERS,
    HIRA_HU = HIRA_FU,
    KATA_HU = KATA_FU,

    ERR_UNKNOWN = 0x8000u,
    ERR_NULL_PTR_INPUT,
    ERR_BROKEN_ROMAJI,
    ERR_LOST_SYLLABLE,

    ERR_UNUSED = 0xFFFFu
};

#endif
