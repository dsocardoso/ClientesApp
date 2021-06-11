package io.github.dsocardoso.clientesapi.service;

import io.github.dsocardoso.clientesapi.exception.UsuarioCadastradoException;
import io.github.dsocardoso.clientesapi.model.entity.Usuario;
import io.github.dsocardoso.clientesapi.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvar (Usuario usuario) {
        boolean exists = usuarioRepository.existsByUsername(usuario.getUsername());
        if (exists) {
            throw new UsuarioCadastradoException(usuario.getUsername());
        }
         return usuarioRepository.save(usuario);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário ou login incorretos"));
        return User
                .builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .roles("USER")
                .build();
    }
}
