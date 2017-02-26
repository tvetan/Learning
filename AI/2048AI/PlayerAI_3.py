import time
from random import randint
from BaseAI_3 import BaseAI
from math import log

from enum import Enum

class Player(Enum):
    Human = 1
    Computer = 2

timeLimit = 0.1
BOARD_SIZE = 4
TARGET_POINTS = 2048
MINIMUM_WIN_SCORE = 18432

class PlayerAI(BaseAI):
    def __init__(self):
        self.grid = None
        self.moves = None

    def getMove(self, grid):
        self.moves = grid.getAvailableMoves()
        self.grid = grid

        best = self.getBest()
        print(best)
        #return None
        return best[0]

    def heuristicScore(self, grid):
        empty_cells = len(grid.getAvailableCells())

        smooth_weight = 0.1
        mono2_weight = 1.0
        empty_weight = 2.7
        max_weight = 1.0

        return log(empty_cells) * empty_weight + grid.getMaxTile() * max_weight

    def alphabeta(self, depth, grid, alpha, beta, player):
        best_score = None
        best_move = -1
        result = None
        if player == Player.Human:
            best_score = alpha

            for direction in [0, 1, 2, 3]:
                new_grid = grid.clone()
                is_moved = new_grid.move(direction)
                if not is_moved:
                    continue

                if new_grid.getMaxTile() == 2048:
                    return (direction, 10000)

                if depth == 0:
                    result = (direction, self.heuristicScore(new_grid))
                else:
                    result = self.alphabeta(depth - 1, new_grid, best_score, beta, Player.Computer)
                    if result[1] > 9900:
                        result = (result[0], result[1] - 1)

                if result[1] > best_score:
                    best_score = result[1]
                    best_move = direction

                if best_score > beta:
                    return (best_move, beta)
        else:
            best_score = beta
            candidates = []
            max_score = -10000
            cells = grid.getAvailableCells()
            scores = {2: [], 4: []}
            for score in scores:
                for index, cell in enumerate(cells):
                    scores[score].append(None)
                    grid.insertTile(cell, score)
                    scores[score][index] = -self.getGridSmoothness(grid)
                    if max_score < scores[score][index]:
                        max_score = scores[score][index]
                    grid.insertTile(cell, 0)

            for score in scores:
                for i in (0, len(scores[score]) - 1):
                    if scores[score][i] == max_score:
                        candidates.append((cells[i], score))

            for candidate in candidates:
                position = candidate[0]
                value = candidate[1]
                new_grid = grid.clone()
                new_grid.insertTile(position, value)

                result = self.alphabeta(depth, new_grid, alpha, best_score, Player.Human)
                if result[1] < best_score:
                    best_score = result[1]

                if best_score < alpha:
                    return (None, alpha)

        return (best_move, best_score)

    def getGridSmoothness(self, grid):
        smoothness = 0
        for x in range(0, 4):
            for y in range(0, 4):
                cellContent = grid.getCellValue((x, y))
                if cellContent == 0:
                    continue
                value = log(cellContent) / log(2)
                for direction in range(1, 3):
                    vector = self.getVector(direction)
                    targetCell = self.findFarthestPosition((x, y), vector, grid)
                    targetValue = grid.getCellValue(targetCell)
                    if targetValue == 2 or targetValue == 4:
                        target_smootness_value = log(targetValue) / log(2)
                        smoothness -= abs(value - target_smootness_value)
        return smoothness

    def getVector(self, direction):
        vectors = {0: (0, -1), 1: (1, 0), 2: (0, 1), 3: (-1, 0)}
        return vectors[direction]

    def findFarthestPosition(self, cell, vector, grid):
        previous = None
        while True:
            previous = cell
            cell = (previous[0] + vector[0], previous[1] + vector[1])
            if grid.crossBound(cell) or not grid.canMove(cell):
                break
        return previous

    def getBest(self):
        startTime = time.clock()
        best = [0, -10000]
        depth = 0
        print("getbest")
        result = self.alphabeta(5, self.grid, -10000, 10000, Player.Human)
        # while time.clock() - startTime < timeLimit:
        #     newBest = self.alphabeta(depth, self.grid, -10000, 10000, Player.Human)
        #     if (best[1] < newBest[1]):
        #         best[1] = newBest[1]
        #         best[0] = newBest[0]
        #     depth += 1
        return result
