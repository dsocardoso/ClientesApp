package io.github.dsocardoso.clientesapi.model.repository;

import io.github.dsocardoso.clientesapi.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsername (String username);

    boolean existsByUsername(String username);
}
