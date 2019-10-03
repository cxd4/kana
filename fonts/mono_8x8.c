#include "../putchar.h"

const unsigned char kfont8[][8] = {
    { /* hiragana "A" */
        strtobyte("   |    "),
        strtobyte("---+--- "),
        strtobyte("   |    "),
        strtobyte("  /+-\ /"),
        strtobyte(" / |  X "),
        strtobyte("/  | / X"),
        strtobyte("\  |/  |"),
        strtobyte(" \/ * / "),
    },
};

void
kputc8(unsigned int code_point)
{
    unsigned char scanline, pixel;
    register unsigned int x, y;
    const unsigned char* glyph = addr_translate_from_code_point(code_point);

    for (y = 0; y < 8; y++) {
        scanline = glyph[0];
        for (x = 0; x < 8; x++) {
            pixel = (scanline >> (7 ^ x)) & 1;
            putchar(pixel ? '*' : ' ');
        }
        putchar('\n');
    }
}

void*
addr_translate_from_code_point(unsigned int code_point)
{
  /* unimplemented for now... */
    return &(kfont8[0][0]);
}
