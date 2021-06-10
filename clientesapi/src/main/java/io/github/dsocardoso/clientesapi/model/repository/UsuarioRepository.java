package io.github.dsocardoso.clientesapi.model.repository;

import io.github.dsocardoso.clientesapi.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
}
