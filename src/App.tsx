import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Checkbox,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip
} from '@mui/material';
import { Delete as DeleteIcon, Flag as FlagIcon, Category as CategoryIcon, Event as EventIcon } from '@mui/icons-material';

type Priority = 'low' | 'medium' | 'high';
type Category = 'personal' | 'work' | 'shopping' | 'other';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<Category>('personal');
const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');
const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

const handleAddTodo = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newTodos = [...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        priority: selectedPriority,
        category: selectedCategory,
        dueDate: selectedDate
      }];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setInputValue('');
    }
  };

  const handleToggleTodo = (id: number) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          To-Do List
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleAddTodo}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
              >
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="shopping">Shopping</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={selectedPriority}
                label="Priority"
                onChange={(e) => setSelectedPriority(e.target.value as Priority)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <List>
          {todos.map((todo, index) => (
            <React.Fragment key={todo.id}>
              {index > 0 && <Divider />}
              <ListItem>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  color="primary"
                />
                <Box sx={{ flexGrow: 1 }}>
                  <ListItemText
                    primary={todo.text}
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip
                          size="small"
                          icon={<CategoryIcon />}
                          label={todo.category}
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          icon={<FlagIcon />}
                          label={todo.priority}
                          color={todo.priority === 'high' ? 'error' : todo.priority === 'medium' ? 'warning' : 'success'}
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          icon={<EventIcon />}
                          label={new Date(todo.dueDate).toLocaleDateString()}
                          variant="outlined"
                        />
                      </Box>
                    }
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? 'text.secondary' : 'text.primary'
                    }}
                  />
                </Box>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteTodo(todo.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        {todos.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
            <Typography variant="body1">
              No tasks yet. Add one above!
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;