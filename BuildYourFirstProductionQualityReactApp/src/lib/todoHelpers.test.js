import {addTodo} from './todoHelpers'

test('addTodo should add the passed item to the list', () => {
    const startTodos = [
        {
          id: 1, 
          name: "task 1", 
          isComplete: true
        },
        {
          id: 2, 
          name: "task 2", 
          isComplete: false
        }
      ];

      const newTodo = {
          id: 3, 
          name: "task 3", 
          isComplete: false
        };

        const expected = [
           {
          id: 1, 
          name: "task 1", 
          isComplete: true
        },
        {
          id: 2, 
          name: "task 2", 
          isComplete: false
        }, 
        {
          id: 3, 
          name: "task 3", 
          isComplete: false
        }
        ]

        const result = addTodo(startTodos, newTodo);

        expect(result).toEqual(expected)
})

test('addTodo should not mutate the start list', () => {
    const startTodos = [
        {
          id: 1, 
          name: "task 1", 
          isComplete: true
        },
        {
          id: 2, 
          name: "task 2", 
          isComplete: false
        }
      ];

      const newTodo = {
          id: 3, 
          name: "task 3", 
          isComplete: false
        };

        const expected = [
           {
          id: 1, 
          name: "task 1", 
          isComplete: true
        },
        {
          id: 2, 
          name: "task 2", 
          isComplete: false
        }, 
        {
          id: 3, 
          name: "task 3", 
          isComplete: false
        }
        ]

        const result = addTodo(startTodos, newTodo);

        expect(result).not.toEqual(startTodos)
})