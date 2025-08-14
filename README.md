# Ejercicios Riwi
lo que se puede apreciar en este repo es todos los trabajos de la semanas todo esto con el objetivo de conservar la informacion aprendida

## ayudas para encarpetar
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bibliosoft - Library Management Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body class="bg-light">

    <nav class="navbar navbar-dark bg-primary">
        <div class="container">
            <span class="navbar-brand">
                <i class="bi bi-book"></i> Bibliosoft - Biblioteca Central de Colombia
            </span>
        </div>
    </nav>

    <div class="container mt-4">
        
        <!-- Tabs -->
        <ul class="nav nav-tabs" id="mainTabs">
            <li class="nav-item">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#users">Users</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#fines">Fines</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#reports">Reports</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#upload">CSV Upload</button>
            </li>
        </ul>

        <div class="tab-content mt-4">
            
            <!-- USERS TAB -->
            <div class="tab-pane fade show active" id="users">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3>Users Management</h3>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userModal">
                        <i class="bi bi-plus"></i> Add User
                    </button>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Document</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="usersTable">
                            <!-- Users loaded dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- FINES TAB -->
            <div class="tab-pane fade" id="fines">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3>Fines Management</h3>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#fineModal">
                        <i class="bi bi-plus"></i> Add Fine
                    </button>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Book</th>
                                <th>Generated</th>
                                <th>Paid</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="finesTable">
                            <!-- Fines loaded dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- REPORTS TAB -->
            <div class="tab-pane fade" id="reports">
                <h3>Advanced Reports</h3>
                
                <div class="row mt-4">
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5>Books per User</h5>
                                <button class="btn btn-outline-primary" onclick="loadBooksPerUser()">
                                    Generate Report
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5>Overdue Loans</h5>
                                <button class="btn btn-outline-warning" onclick="loadOverdueLoans()">
                                    Generate Report
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5>Books by Author</h5>
                                <input type="number" class="form-control mb-2" id="authorId" placeholder="Author ID">
                                <button class="btn btn-outline-info" onclick="loadBooksByAuthor()">
                                    Generate Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="reportResults" class="mt-4"></div>
            </div>

            <!-- CSV UPLOAD TAB -->
            <div class="tab-pane fade" id="upload">
                <h3>CSV Upload</h3>
                
                <div class="card mt-4">
                    <div class="card-body">
                        <form id="csvForm">
                            <div class="mb-3">
                                <label class="form-label">Select Entity</label>
                                <select class="form-select" name="entity" required>
                                    <option value="">Choose entity...</option>
                                    <option value="users">Users</option>
                                    <option value="fines">Fines</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">CSV File</label>
                                <input type="file" class="form-control" name="csvFile" accept=".csv" required>
                            </div>
                            
                            <button type="submit" class="btn btn-success">
                                <i class="bi bi-upload"></i> Upload CSV
                            </button>
                        </form>
                        
                        <div id="uploadResult" class="mt-3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- User Modal -->
    <div class="modal fade" id="userModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="userForm">
                        <input type="hidden" id="userId">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" id="userName" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Document Number</label>
                            <input type="text" class="form-control" id="userDocument" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Address</label>
                            <textarea class="form-control" id="userAddress"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Phone</label>
                            <input type="text" class="form-control" id="userPhone">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" id="userEmail">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saveUser()">Save</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Fine Modal -->
    <div class="modal fade" id="fineModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Fine</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="fineForm">
                        <input type="hidden" id="fineId">
                        <div class="mb-3">
                            <label class="form-label">Loan ID</label>
                            <input type="number" class="form-control" id="fineLoanId" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Generated Fine</label>
                            <input type="number" step="0.01" class="form-control" id="fineGenerated" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Paid Fine</label>
                            <input type="number" step="0.01" class="form-control" id="finePaid" value="0">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saveFine()">Save</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
/mi-proyecto
│
├── index.html
├── README.md
├── db.json
│
├── /css
│   └── style.css
│
├── /js
│   ├── main.js
│   └── routes.js
│
├── /views
│   ├── home.html
│   ├── about.html
│   └── 404.html


# Mejoras UX/UI para la Aplicación de Gestión de Eventos

Analicé tu aplicación y he identificado varias oportunidades para mejorar la experiencia de usuario y la interfaz. Implementaré las siguientes mejoras:

## Problemas identificados:
1. Interfaz minimalista sin estilos visuales
2. Falta de feedback visual en las acciones
3. Diseño no responsivo
4. Navegación poco intuitiva
5. Escasez de elementos visuales que guíen al usuario
6. Mensajes de alerta básicos

