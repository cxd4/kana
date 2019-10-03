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

extern const unsigned char kfont8[][8];

extern void kputc8(unsigned int code_point);

extern void* addr_translate_from_code_point(unsigned int code_point);

#endif
