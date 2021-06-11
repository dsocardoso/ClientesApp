package io.github.dsocardoso.clientesapi.exception;

public class UsuarioCadastradoException extends RuntimeException {

    public UsuarioCadastradoException(String login) {
        super("Usuário já cadastrado para o login informado" + login);
    }
}
