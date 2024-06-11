package com.example.sudokusolver.controller;

import org.springframework.web.bind.annotation.*;

import com.example.sudokusolver.SudokuSolver;

@RestController
@RequestMapping("/api")
public class SudokuController {

    @PostMapping("/checkBoard")
    public boolean checkBoard(@RequestBody int[][] board) {
        int[][] solution = {
            {3, 8, 7, 4, 9, 1, 6, 2, 5},
            {2, 4, 1, 5, 6, 8, 3, 7, 9},
            {5, 6, 9, 3, 2, 7, 4, 1, 8},
            {7, 5, 8, 6, 1, 9, 2, 3, 4},
            {1, 2, 3, 7, 8, 4, 5, 9, 6},
            {4, 9, 6, 2, 5, 3, 1, 8, 7},
            {9, 3, 4, 1, 7, 6, 8, 5, 2},
            {6, 7, 5, 8, 3, 2, 9, 4, 1},
            {8, 1, 2, 9, 4, 5, 7, 6, 3}
        };

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] != solution[r][c]) {
                    return false;
                }
            }
        }
        return true;
    }

    @PostMapping("/solveBoard")
    public int[][] solveBoard(@RequestBody int[][] board) {
        SudokuSolver.solveBoard(board);
        return board;
    }
}
