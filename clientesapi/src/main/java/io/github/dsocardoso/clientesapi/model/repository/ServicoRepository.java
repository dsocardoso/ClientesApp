package io.github.dsocardoso.clientesapi.model.repository;

import io.github.dsocardoso.clientesapi.model.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoRepository  extends JpaRepository<Servico, Integer> {
}

