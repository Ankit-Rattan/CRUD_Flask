from flask import Flask, jsonify, request
from data import tasks
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 


@app.route('/')
def home():
    return 'Hello World!'

#Get all task
@app.route('/api/tasks', methods=['GET'])
def get_task():
    return jsonify(tasks)

# post new task
@app.route('/api/tasks', methods=['POST'])
def add_task():
    new_task = request.json
    new_task['id'] = len(tasks) + 1
    tasks.append(new_task)
    return jsonify(new_task), 201
    
# Update new task 
@app.route('/api/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = next((task for task in tasks if task['id'] == id), None)
    if task:
        task['completed'] = request.json.get('completed', task['completed'])
        return jsonify(task)
    return jsonify({'error': 'Task not found'}), 404

# Delete the task
@app.route('/api/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    index = next((index for index, task in enumerate(tasks) if task['id'] == id), None)
    if index is not None:
        deleted_task = tasks.pop(index)
        return jsonify(deleted_task)
    return jsonify({'error': 'Task not found'}), 404



if __name__ == '__main__':
    app.run(debug=True)
