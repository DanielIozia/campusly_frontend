# Campusly Frontend — Convenzioni di Codice

## Struttura del Progetto

```
src/app/
├── core/                  # Servizi globali, interceptor, modelli
│   ├── guards/            # auth.guard.ts, guest.guard.ts
│   ├── interceptors/      # authInterceptor.ts, credentials.interceptor.ts
│   ├── models/            # api.interfaces.ts, auth.models.ts, register.models.ts
│   └── services/          # auth.service.ts, registration.service.ts, form-error.service.ts, toaster.service.ts
├── features/              # Moduli funzionali (lazy-loaded)
│   ├── auth/              # login, register, forgot-password, oauth-callback
│   ├── feed/              # feed principale
│   ├── chat/              # chat
│   ├── events/            # eventi
│   ├── creation/          # creazione contenuti
│   ├── profile/           # profilo utente
│   └── admin/             # amministrazione
├── layouts/               # Layout principali (main-layout)
│   └── main-layout/       # main-layout.component.*
├── shared/                # Componenti, pipe, direttive riutilizzabili
│   └── components/
│       ├── bottom-nav/    # Navigazione mobile
│       ├── confirm-dialog/
│       ├── form-error/    # Messaggi di errore form
│       ├── top-bar/       # Header
│       └── toast/         # Toast notification
├── environments/          # Configurazioni ambiente (environment.ts, environment.production.ts)
├── styles/                # SCSS globali e design system
│   └── custom.scss        # Token di design
```

## Componenti

- Tutti i componenti sono **standalone**.
- Ogni feature ha la propria cartella sotto `features/` con un file `*.routes.ts` dedicato.
- Le route delle feature sono caricate in **lazy loading** tramite `loadChildren` in `app.routes.ts`.

## Form — Gestione Errori

Ogni form che utilizza `ReactiveFormsModule` **deve** integrare il componente `<app-form-error>` per la validazione inline.

### Setup nel Component (.ts)

```typescript
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  // ...
})
export class MyComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
```

### Utilizzo nel Template (.html)

Sotto ogni `<input>`, aggiungere il componente di errore:

```html
<div class="my-feature__field">
    <label class="my-feature__label">Email</label>
    <input type="email" formControlName="email" class="input-field input-rounded"
        placeholder="student@polimi.it">
    <app-form-error [control]="myForm.get('email')"></app-form-error>
</div>
```

Il componente mostra il messaggio **solo** quando il controllo è `invalid` e `touched`.

### Messaggi di Errore Supportati

I messaggi sono centralizzati in `FormErrorService` (`core/services/form-error/form-error.service.ts`):

| Chiave       | Messaggio                        |
|--------------|----------------------------------|
| `required`   | Campo obbligatorio               |
| `email`      | Email non valida                 |
| `minlength`  | Minimo {n} caratteri             |
| `maxlength`  | Massimo {n} caratteri            |
| `min`        | Il valore minimo è {n}           |
| `max`        | Il valore massimo è {n}          |
| `pattern`    | Formato non valido               |

Per aggiungere nuovi validatori personalizzati, estendere la mappa `messages` nel servizio.

## Gestione Errori Backend nei Servizi

Ogni metodo all'interno di un servizio che effettua chiamate HTTP verso il backend **deve** utilizzare il servizio `toasterService` per la visualizzazione di errori e warning tramite toast.

### Esempio di implementazione:

```typescript
login(data: Auth_Models.Login_Request): Observable<ApiBase_Response<Auth_Models.Me_ResponseData>> {
  return this.http.post<ApiBase_Response<Auth_Models.Me_ResponseData>>(`${this.baseUrl}/login`, data).pipe(
    tap({
      next: (res) => {
        this.currentUser.set(res.data);
      },
      error: (err: HttpErrorResponse) => {
        this.toasterService.sendErrorToast(err);
      }
    })
  );
}
```

> **Nota:** Questo pattern va applicato a **tutti** i metodi che interagiscono con il backend, per garantire una UX coerente e una gestione centralizzata degli errori.

## Stili degli Input

- Usare le classi globali `input-field` e `input-rounded` per gli input dei form.
- Ogni campo deve essere wrappato in un contenitore `__field` con layout flex column e gap `4px`.
- La label usa classe `__label` con `font-size: 0.75rem`, `font-weight: 700`, colore `--on-surface-variant`.

## Naming Convention (BEM)

I componenti usano **BEM** con prefisso feature:

```
.auth-login__field      → blocco: auth-login, elemento: field
.auth-register__label   → blocco: auth-register, elemento: label
```

## SCSS

- Ogni componente importa il file condiviso: `@use 'custom' as *;`
- I token di design (colori, spacing, radius) sono definiti come variabili CSS (`--primary`, `--surface-container-low`, ecc.) e variabili SCSS (`$space-md`, `$radius-default`, ecc.) in `styles/custom.scss`.
