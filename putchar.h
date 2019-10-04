#ifndef _PUTCHAR_H_
#define _PUTCHAR_H_

#define NOTBLANK(character)     ((character) != ' ' ? 0x01u : 0x00u)

#define strtobyte(s) (\
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

enum {
    HIRA_A,   HIRA_I,   HIRA_U,   HIRA_E,   HIRA_O,
    HIRA_KA,  HIRA_KI,  HIRA_KU,  HIRA_KE,  HIRA_KO,
    HIRA_SA,  HIRA_SHI, HIRA_SU,  HIRA_SE,  HIRA_SO,
    HIRA_TA,  HIRA_CHI, HIRA_TSU, HIRA_TE,  HIRA_TO,
    HIRA_NA,  HIRA_NI,  HIRA_NU,  HIRA_NE,  HIRA_NO,
    HIRA_HA,  HIRA_HI,  HIRA_FU,  HIRA_HE,  HIRA_HO,
    HIRA_MA,  HIRA_MI,  HIRA_MU,  HIRA_ME,  HIRA_MO,
/*
 * ... and still more to add yet
 */

    NUMBER_OF_KANA_LETTERS
};

#endif
