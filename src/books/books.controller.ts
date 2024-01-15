import { Controller, Get, Param, NotFoundException, Post, Body, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get('/')
    getAll() {
        return this.booksService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const book = await this.booksService.getById(id);
        if (!book) throw new NotFoundException('Book not found');
        return book;
    }

    @Post('/')
    public create(@Body() bookData: CreateBookDTO) {
        return this.booksService.create(bookData);
    }

    @Put('/:id')
    async updateById(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() bookData: UpdateBookDTO,
    ) {
        if (!(await this.booksService.getById(id)))
        throw new NotFoundException('Book not found');
        await this.booksService.updateById(id, bookData);
        return { success: true };
    }

    @Delete('/:id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('Book not found');
    await this.booksService.delete(id);
    return { success: true };
    }
}